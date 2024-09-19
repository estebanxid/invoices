import { Injectable } from '@nestjs/common';
import { InvoiceReceivedService } from '@invoice/domain/service/invoice-service.interface';
import { Invoice, TrasladoP } from '@invoice/domain/model/invoice.model';
import { TaxesType } from '@invoice/domain/enum/taxes-type.enum';
import { FactorType } from '@invoice/domain/enum/factor-type.enum';

@Injectable()
export class InvoiceReceivedServiceImpl implements InvoiceReceivedService {
  public calculateIva(invoices: Invoice[]): number {
    return invoices.reduce((total, invoice) => {
      let taxes = this.getAndValidationTaxesReceived(invoice);
      taxes = this.filterTaxesOnlyIva(taxes);

      const totalTaxesReceived = this.sumTaxes(taxes);
      return (total += totalTaxesReceived);
    }, 0);
  }

  private getAndValidationTaxesReceived(invoices: Invoice): TrasladoP[] {
    const taxesReceived =
      invoices.Comprobante.Complemento.Pagos.Pago.ImpuestosP.TrasladosP
        .TrasladoP;
    return taxesReceived ? this.convertArrayTaxes(taxesReceived) : [];
  }

  private sumTaxes(taxes: TrasladoP[]): number {
    return taxes.reduce((total, tax) => {
      return (total += Number(tax.ImporteP));
    }, 0);
  }

  private filterTaxesOnlyIva = (taxes: TrasladoP[]) => {
    return taxes.filter(
      (tax) =>
        tax.ImpuestoP === TaxesType.iva && tax.TipoFactorP === FactorType.Tasa,
    );
  };

  private convertArrayTaxes(taxes: TrasladoP | TrasladoP[]): TrasladoP[] {
    const isArray = Array.isArray(taxes);

    if (isArray) return taxes;

    return [taxes];
  }
}
