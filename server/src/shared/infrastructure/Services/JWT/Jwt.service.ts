import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTService {
  constructor(private readonly jwt: JwtService) {}

  async generateToken(payload: object): Promise<string> {
    return await this.jwt.signAsync(payload);
  }

  async verifyToken(token: any): Promise<object> {
    return await this.jwt.verifyAsync(token);
  }
}
