// This will be used as payload

export type Action = {
  recipient_name: string;
  recipient_email: string;
  in_person_name: string;
  action_type: string;
  private_notes?: string;
  verify_recipient: boolean;
};

export interface ZohoDocument {
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
