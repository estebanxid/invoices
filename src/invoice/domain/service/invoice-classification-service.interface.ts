import { Invoice } from '../model/invoice.model';

export interface InvoiceClassification {
  emittedAndReceivedInvoices(invoices: Invoice[]): {
    emittedInvoices: Invoice[];
    receivedInvoices: Invoice[];
  };
}

export const InvoiceClassification = Symbol.for('InvoiceClassification');
