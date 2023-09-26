import { Module } from '@nestjs/common';
import { UseCasesModule } from 'src/shared/use-cases/usecases.module';
import { RepositoryModule } from '../Repositories/userRepository.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [RepositoryModule, UseCasesModule],
  controllers: [AuthController],
})
export class ControllersModule {}
