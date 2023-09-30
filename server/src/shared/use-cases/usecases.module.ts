import { Module } from '@nestjs/common';
import { RepositoryModule } from '../infrastructure/Repositories/userRepository.module';
import { ServicesModule } from '../infrastructure/Services/services.module';
import { LoginUseCases } from './auth/auth.usecases';
import { DocsUseCases } from './docs/docs.usecases';

@Module({
  imports: [RepositoryModule, ServicesModule],
  providers: [LoginUseCases, DocsUseCases],
  exports: [LoginUseCases, DocsUseCases],
})
export class UseCasesModule {}
