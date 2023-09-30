import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Action } from 'src/shared/domain/Services/Zoho/zohoDocument.interface';

export type Document = HydratedDocument<Docs>;

@Schema()
export class Docs {
  @Prop({ required: true })
  file_url: string;

  @Prop({
    required: true,
    type: {
      requests: [
        {
          request_type_id: { type: String, required: true },
          request_name: { type: String, required: true },
          actions: [{ type: Object }], // You can specify the type for Action if needed
        },
      ],
      expiration_days: { type: Number, required: true },
      is_sequential: { type: Boolean, required: true },
      email_reminders: { type: Boolean, required: true },
      reminder_period: { type: Number, required: true },
    },
  })
  data: {
    requests: {
      request_type_id: string;
      request_name: string;
      actions: Array<Action>;
    };
    expiration_days: number;
    is_sequential: boolean;
    email_reminders: boolean;
    reminder_period: number;
  };
}

export const DocumentSchema = SchemaFactory.createForClass(Docs);
