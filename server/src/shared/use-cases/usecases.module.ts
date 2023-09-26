import { Module } from '@nestjs/common';
import { RepositoryModule } from '../infrastructure/Repositories/userRepository.module';
import { LoginUseCases } from './auth/auth.usecases';

@Module({
  imports: [RepositoryModule],
  providers: [LoginUseCases],
  exports: [LoginUseCases],
})
export class UseCasesModule {}
