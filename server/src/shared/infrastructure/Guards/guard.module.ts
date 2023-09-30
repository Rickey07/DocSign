import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ServicesModule } from '../Services/services.module';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [ServicesModule],
  providers: [
    AuthGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthGuard, ServicesModule],
})
export class GuardModule {}
