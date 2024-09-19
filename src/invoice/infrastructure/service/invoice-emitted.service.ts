import { Injectable } from '@nestjs/common';
import { InvoiceEmittedService } from '@invoice/domain/service/invoice-service.interface';
import { DetailTaxes, Invoice } from '@invoice/domain/model/invoice.model';
import { TaxesType } from '@invoice/domain/enum/taxes-type.enum';
import { FactorType } from '@invoice/domain/enum/factor-type.enum';

@Injectable()
export class InvoiceEmittedServiceImpl implements InvoiceEmittedService {
  public calculateIva(invoices: Invoice[]): number {
    return invoices.reduce((total, invoice) => {
      let taxesTraslados = this.getAndValidationTaxesTraslado(invoice);
      let taxesRetencion = this.getAndValidationTaxesRetencion(invoice);

      taxesTraslados = this.filterTaxesOnlyIva(taxesTraslados);
      taxesRetencion = this.filterTaxesOnlyIva(taxesRetencion);

      const totalTaxesTraslados = this.sumTaxes(taxesTraslados);
      const totalTaxesRetencion = this.sumTaxes(taxesRetencion);

      return (total += totalTaxesTraslados - totalTaxesRetencion);
    }, 0);
  }

  private getAndValidationTaxesTraslado(invoices: Invoice): DetailTaxes[] {
    const taxesTraslado = invoices.Comprobante.Impuestos?.Traslados?.Traslado;
    return taxesTraslado ? this.convertArrayTaxes(taxesTraslado) : [];
  }

  private getAndValidationTaxesRetencion(invoices: Invoice): DetailTaxes[] {
    const taxesRetencion =
      invoices.Comprobante.Impuestos?.Retenciones?.Retencion;
    return taxesRetencion ? this.convertArrayTaxes(taxesRetencion) : [];
  }

  private sumTaxes(taxes: DetailTaxes[]): number {
    return taxes.reduce((total, tax) => {
      return (total += Number(tax.Importe));
    }, 0);
  }

  private filterTaxesOnlyIva = (taxes: DetailTaxes[]) => {
    return taxes.filter(
      (tax) =>
        tax.Impuesto === TaxesType.iva && tax.TipoFactor === FactorType.Tasa,
    );
  };

  private convertArrayTaxes(taxes: DetailTaxes | DetailTaxes[]): DetailTaxes[] {
    const isArray = Array.isArray(taxes);

    if (isArray) return taxes;

    return [taxes];
  }
}
