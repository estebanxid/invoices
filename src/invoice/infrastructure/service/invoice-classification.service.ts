import { InvoiceType } from '@invoice/domain/enum/invoice-type.enum';
import { Invoice } from '@invoice/domain/model/invoice.model';
import { InvoiceClassification } from '@invoice/domain/service/invoice-classification-service.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InvoiceClassificationImpl implements InvoiceClassification {
  public emittedAndReceivedInvoices(invoices: Invoice[]): {
    emittedInvoices: Invoice[];
    receivedInvoices: Invoice[];
  } {
    const emittedInvoices: Invoice[] = [];
    const receivedInvoices: Invoice[] = [];

    invoices.forEach((invoice) => {
      const { TipoDeComprobante } = invoice.Comprobante;
      if ([InvoiceType.Income, InvoiceType.Expense].includes(TipoDeComprobante))
        emittedInvoices.push(invoice);

      if (TipoDeComprobante === InvoiceType.Payment)
        receivedInvoices.push(invoice);
    });

    return { emittedInvoices, receivedInvoices };
  }
}
