import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseUserRepository } from 'src/shared/infrastructure/Repositories/user.repository';

@Injectable()
export class LoginUseCases {
  constructor(private readonly userService: DatabaseUserRepository) {}

  async registerUser(email: string, password: string) {
    try {
      const registeredUser = await this.userService.findUserByEmail(email);
      console.log(registeredUser);
      if (registeredUser) {
        throw new HttpException('Already Exists', HttpStatus.BAD_REQUEST);
      }
      const newUser = await this.userService.createUser(email, password);
      return newUser;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Already Exists',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
