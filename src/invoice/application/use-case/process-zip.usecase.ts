import { ZipXmlExtractorAdapter } from '@invoice/domain/adapter/zip-xml-extractor.adapter';
import { Invoice } from '@invoice/domain/model/invoice.model';
import { InvoiceClassification } from '@invoice/domain/service/invoice-classification-service.interface';
import {
  InvoiceEmittedService,
  InvoiceReceivedService,
} from '@invoice/domain/service/invoice-service.interface';
import { XmlParserService } from '@invoice/domain/service/xml-parser-service.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProcessZipUseCase {
  constructor(
    @Inject(ZipXmlExtractorAdapter)
    private readonly zipXmlExtractorAdapter: ZipXmlExtractorAdapter,
    @Inject(XmlParserService)
    private readonly xmlParserService: XmlParserService<Invoice>,
    @Inject(InvoiceClassification)
    private readonly invoiceClassification: InvoiceClassification,
    @Inject(InvoiceEmittedService)
    private readonly invoiceEmittedService: InvoiceEmittedService,
    @Inject(InvoiceReceivedService)
    private readonly invoiceReceivedService: InvoiceReceivedService,
  ) {}

  async execute(file: Express.Multer.File) {
    const xmlFiles = await this.zipXmlExtractorAdapter.extractXmlFiles(file);
    const invoices = this.xmlParserService.arrayToJsonList(xmlFiles);

    const { emittedInvoices, receivedInvoices } =
      this.invoiceClassification.emittedAndReceivedInvoices(invoices);

    const ivaAdeudado =
      this.invoiceEmittedService.calculateIva(emittedInvoices);

    const ivaRecuperar =
      this.invoiceReceivedService.calculateIva(receivedInvoices);

    return {
      ivaAdeudado,
      ivaRecuperar,
      saldoTotal: ivaAdeudado - ivaRecuperar,
    };
  }
}
