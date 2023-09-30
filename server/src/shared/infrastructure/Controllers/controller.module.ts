import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { UseCasesModule } from 'src/shared/use-cases/usecases.module';
import { GuardModule } from '../Guards/guard.module';
import { RepositoryModule } from '../Repositories/userRepository.module';
import { AuthController } from './auth/auth.controller';
import { DocsController } from './docs/docs.controller';

@Module({
  imports: [
    RepositoryModule,
    UseCasesModule,
    GuardModule,
    NestjsFormDataModule,
  ],
  controllers: [AuthController, DocsController],
})
export class ControllersModule {}
