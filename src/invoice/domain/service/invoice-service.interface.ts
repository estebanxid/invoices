import { Invoice } from '../model/invoice.model';

export interface InvoiceEmittedService {
  calculateIva(invoices: Invoice[]): number;
}

export interface InvoiceReceivedService {
  calculateIva(invoices: Invoice[]): number;
}

export const InvoiceEmittedService = Symbol.for('InvoiceEmittedService');
export const InvoiceReceivedService = Symbol.for('InvoiceReceivedService');
