import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentSchema } from './Docs/document.entity';
import { UserSchema } from './user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Docs', schema: DocumentSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Docs', schema: DocumentSchema },
    ]),
  ],
})
export class DatabaseEntitiesModule {}
