import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ZohoDocument } from 'src/shared/domain/Services/Zoho/zohoDocument.interface';
import { DatabaseDocsRepository } from 'src/shared/infrastructure/Repositories/doc/docs.repository';
import { ZohoService } from 'src/shared/infrastructure/Services/Zoho/zoho.service';

@Injectable()
export class DocsUseCases {
  constructor(
    private readonly documentService: DatabaseDocsRepository,
    private readonly zohoService: ZohoService,
  ) {}

  async createNewDocument(document: ZohoDocument) {
    try {
      const newDocument = await this.zohoService.createNewDocument(document);
    } catch (error) {
      return new HttpException(
        'Already Exists',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
