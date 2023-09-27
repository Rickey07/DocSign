import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptService } from './Bcrypt/Bcrypt.service';
import { JWTService } from './JWT/Jwt.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'Helloworld',
      signOptions: { expiresIn: '2days' },
    }),
  ],
  providers: [JWTService, BcryptService],
  exports: [JWTService, BcryptService],
})
export class ServicesModule {}
