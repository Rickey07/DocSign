import { Body, Controller, Post } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { DocsUseCases } from 'src/shared/use-cases/docs/docs.usecases';
import { Public } from '../../configs/Guards/Public.guard.config';
import { CreateDocumentDTO } from './docs.dto';

@Controller()
export class DocsController {
  constructor(private readonly documentUseCases: DocsUseCases) {}

  @Public()
  @Post('docs')
  @FormDataRequest()
  async createDocument(
    @Body() createDocumentDTO: CreateDocumentDTO,
  ): Promise<void> {
    try {
      const data =
        await this.documentUseCases.createNewDocument(createDocumentDTO);
    } catch (error) {}
  }
}
