import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProcessZipUseCase } from 'src/invoice/application/use-case/process-zip.usecase';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly processZipUseCase: ProcessZipUseCase) {}

  @Post('zip')
  @UseInterceptors(FileInterceptor('file'))
  async uploadZip(@UploadedFile() file: Express.Multer.File) {
    return this.processZipUseCase.execute(file);
  }
}
