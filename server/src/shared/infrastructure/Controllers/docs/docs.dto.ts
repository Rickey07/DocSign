import { Action } from 'src/shared/domain/Services/Zoho/zohoDocument.interface';

export class CreateDocumentDTO {
  file: string;
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
