import { Module } from '@nestjs/common';
import { RepositoryModule } from '../infrastructure/Repositories/userRepository.module';
import { ServicesModule } from '../infrastructure/Services/services.module';
import { LoginUseCases } from './auth/auth.usecases';

@Module({
  imports: [RepositoryModule, ServicesModule],
  providers: [LoginUseCases],
  exports: [LoginUseCases],
})
export class UseCasesModule {}
