import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfigModule } from '../configs/config.module';
@Module({
  imports: [
    EnvConfigModule,
    MongooseModule.forRoot(`${process.env.MONGO_URI}`, {
      retryAttempts: 2,
    }),
  ],
})
export class DatabaseModule {}
