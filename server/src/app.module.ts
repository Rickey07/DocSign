import { Module } from '@nestjs/common';
import { ControllersModule } from './shared/infrastructure/Controllers/controller.module';
import { DatabaseModule } from './shared/infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule, ControllersModule],
})
export class AppModule {}
