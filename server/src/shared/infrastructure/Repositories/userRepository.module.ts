import { Module } from '@nestjs/common';
import { DatabaseEntitiesModule } from '../entities/entity.module';
import { DatabaseUserRepository } from './user.repository';

@Module({
  imports: [DatabaseEntitiesModule],
  providers: [DatabaseUserRepository],
  exports: [DatabaseUserRepository],
})
export class RepositoryModule {}
