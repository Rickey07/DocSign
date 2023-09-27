import { Body, Controller, Post } from '@nestjs/common';
import { authUserDTO } from './auth.dto';
import { LoginUseCases } from 'src/shared/use-cases/auth/auth.usecases';

@Controller()
export class AuthController {
  constructor(private authUseCases: LoginUseCases) {}
  @Post('signup')
  async registerUser(@Body() authUserDTO: authUserDTO) {
    try {
      const { email, password } = authUserDTO;
      const registerdUser = await this.authUseCases.registerUser(
        email,
        password,
      );
      return registerdUser;
    } catch (error) {
      return error;
    }
  }

  @Post('signin')
  async loginUser(@Body() authUserDTO: authUserDTO): Promise<any> {
    try {
      const { email, password } = authUserDTO;
      const data = await this.authUseCases.loginUser(email, password);
      return data;
    } catch (error) {
      return error;
    }
  }
}
