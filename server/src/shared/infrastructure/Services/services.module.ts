import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptService } from './Bcrypt/Bcrypt.service';
import { JWTService } from './JWT/Jwt.service';
import { ZohoService } from './Zoho/zoho.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'Helloworld',
      signOptions: { expiresIn: '2days' },
    }),
    HttpModule,
    CacheModule.register(),
  ],
  providers: [JWTService, BcryptService, ZohoService],
  exports: [JWTService, BcryptService, ZohoService],
})
export class ServicesModule {}
