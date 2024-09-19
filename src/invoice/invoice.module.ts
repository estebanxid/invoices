import { Module } from '@nestjs/common';

import { MulterModule } from '@nestjs/platform-express';
import { InvoiceController } from './infrastructure/controller/invoice';
import { XmlParserService } from './domain/service/xml-parser-service.interface';
import { ProcessZipUseCase } from './application/use-case/process-zip.usecase';
import { memoryStorage } from 'multer';
import { ZipXmlExtractorAdapterImpl } from './infrastructure/adapter/zip-xml-extractor.adapter';
import { ZipXmlExtractorAdapter } from './domain/adapter/zip-xml-extractor.adapter';
import { XmlParserServiceImpl } from './infrastructure/service/xml-parser.service';
import {
  InvoiceEmittedService,
  InvoiceReceivedService,
} from './domain/service/invoice-service.interface';
import { InvoiceClassification } from './domain/service/invoice-classification-service.interface';
import { InvoiceClassificationImpl } from './infrastructure/service/invoice-classification.service';
import { InvoiceEmittedServiceImpl } from './infrastructure/service/invoice-emitted.service';
import { InvoiceReceivedServiceImpl } from './infrastructure/service/invoice-received.service';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [InvoiceController],
  providers: [
    ProcessZipUseCase,
    {
      provide: ZipXmlExtractorAdapter,
      useClass: ZipXmlExtractorAdapterImpl,
    },
    {
      provide: XmlParserService,
      useClass: XmlParserServiceImpl,
    },
    {
      provide: InvoiceEmittedService,
      useClass: InvoiceEmittedServiceImpl,
    },
    {
      provide: InvoiceReceivedService,
      useClass: InvoiceReceivedServiceImpl,
    },
    {
      provide: InvoiceClassification,
      useClass: InvoiceClassificationImpl,
    },
  ],
})
export class InvoiceModule {}
