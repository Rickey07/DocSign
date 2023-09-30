import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseUserRepository } from 'src/shared/infrastructure/Repositories/user.repository';
import { BcryptService } from 'src/shared/infrastructure/Services/Bcrypt/Bcrypt.service';
import { JWTService } from 'src/shared/infrastructure/Services/JWT/Jwt.service';
import { ZohoService } from 'src/shared/infrastructure/Services/Zoho/zoho.service';

@Injectable()
export class LoginUseCases {
  constructor(
    private readonly userService: DatabaseUserRepository,
    private readonly jwtService: JWTService,
    private readonly passwordService: BcryptService,
    private readonly zohoService: ZohoService,
  ) {}

  async registerUser(email: string, password: string) {
    try {
      const registeredUser = await this.userService.findUserByEmail(email);
      if (registeredUser) {
        return new HttpException('Already Exists', HttpStatus.BAD_REQUEST);
      }
      const hashedPassword = await this.passwordService.hashPassword(password);
      const newUser = await this.userService.createUser(email, hashedPassword);
      return newUser;
    } catch (error) {
      return new HttpException(
        'Already Exists',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginUser(email: string, password: string): Promise<any> {
    try {
      const isUserExists = await this.userService.findUserByEmail(email);
      if (isUserExists === null) {
        return new HttpException('No Account Found', HttpStatus.BAD_REQUEST);
      }
      // Check password whether it is correct or not
      const isPasswordCorrect = await this.passwordService.comparePassword(
        password,
        isUserExists.password,
      );
      if (!isPasswordCorrect) {
        return new HttpException(
          'Incorrect Credentials',
          HttpStatus.BAD_REQUEST,
        );
      }
      // Generate access token with below payload
      const payload = { sub: isUserExists._id, email: isUserExists.email };
      const token = await this.jwtService.generateToken(payload);
      const mainToken =
        await this.zohoService.generateAccessTokenByRefreshToken();
      console.log(mainToken);
      const data = {
        token,
        details: {
          id: isUserExists._id,
          email: isUserExists.email,
        },
      };
      return new HttpException(data, HttpStatus.OK);
    } catch (error) {
      console.log(error);
      return new HttpException(
        'Already Exists',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
