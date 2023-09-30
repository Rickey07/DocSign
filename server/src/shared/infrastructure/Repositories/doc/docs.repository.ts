import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ZohoDocument } from 'src/shared/domain/Services/Zoho/zohoDocument.interface';
import { Docs as DocsEntity } from '../../entities/Docs/document.entity';

@Injectable()
export class DatabaseDocsRepository {
  constructor(
    @InjectModel('Docs') private readonly DocsModel: Model<DocsEntity>,
  ) {}

  async saveDocument(document: ZohoDocument): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      return error;
    }
  }
}
