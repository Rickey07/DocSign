import { Module } from '@nestjs/common';
import { DatabaseEntitiesModule } from '../entities/entity.module';
import { DatabaseUserRepository } from './user.repository';
import { DatabaseDocsRepository } from './doc/docs.repository';

@Module({
  imports: [DatabaseEntitiesModule],
  providers: [DatabaseUserRepository, DatabaseDocsRepository],
  exports: [DatabaseUserRepository, DatabaseDocsRepository],
})
export class RepositoryModule {}
