import { FactorType } from '../enum/factor-type.enum';
import { InvoiceType } from '../enum/invoice-type.enum';
import { TaxesType } from '../enum/taxes-type.enum';

export interface Invoice {
  '?xml': Xml;
  Comprobante: Comprobante;
}

export interface Xml {
  version: string;
  encoding: string;
}

export interface Comprobante {
  Emisor: Emisor;
  Receptor: Receptor;
  Conceptos: Conceptos;
  Complemento: Complemento;
  'xmlns:ns0': string;
  'xmlns:ns2': string;
  'xmlns:ns3'?: string;
  'xmlns:xsi': string;
  'xsi:schemaLocation': string;
  Version: string;
  Fecha: string;
  Sello: string;
  NoCertificado: string;
  Certificado: string;
  Moneda: string;
  TipoDeComprobante: InvoiceType;
  Exportacion: string;
  MetodoPago?: string;
  Serie?: string;
  Folio: string;
  LugarExpedicion: string;
  SubTotal: string;
  Descuento?: string;
  Total: string;
  Impuestos?: Impuestos;
  FormaPago?: string;
  TipoCambio?: string;
  CondicionesDePago?: string;
}

export interface Emisor {
  RegimenFiscal: string;
  Rfc: string;
  Nombre: string;
}

export interface Receptor {
  Rfc: string;
  Nombre: string;
  DomicilioFiscalReceptor: string;
  RegimenFiscalReceptor: string;
  UsoCFDI: string;
}

export interface Conceptos {
  Concepto: any;
}

export interface Complemento {
  Nomina?: Nomina;
  TimbreFiscalDigital: TimbreFiscalDigital;
  ImpuestosLocales?: ImpuestosLocales;
  Pagos?: Pagos;
  Divisas?: Divisas;
}

export interface Nomina {
  Emisor: Emisor2;
  Receptor: Receptor2;
  Percepciones: Percepciones;
  Deducciones: Deducciones;
  OtrosPagos: OtrosPagos;
  Version: string;
  TipoNomina: string;
  FechaPago: string;
  FechaInicialPago: string;
  FechaFinalPago: string;
  NumDiasPagados: string;
  TotalPercepciones: string;
  TotalDeducciones: string;
  TotalOtrosPagos: string;
}

export interface Emisor2 {
  RegistroPatronal: string;
}

export interface Receptor2 {
  Curp: string;
  NumSeguridadSocial: string;
  FechaInicioRelLaboral: string;
  Antigüedad: string;
  TipoContrato: string;
  Sindicalizado: string;
  TipoJornada: string;
  TipoRegimen: string;
  NumEmpleado: string;
  Departamento: string;
  Puesto: string;
  RiesgoPuesto: string;
  PeriodicidadPago: string;
  SalarioBaseCotApor: string;
  SalarioDiarioIntegrado: string;
  ClaveEntFed: string;
}

export interface Percepciones {
  Percepcion: Percepcion[];
  TotalSueldos: string;
  TotalGravado: string;
  TotalExento: string;
}

export interface Percepcion {
  TipoPercepcion: string;
  Clave: string;
  Concepto: string;
  ImporteGravado: string;
  ImporteExento: string;
}

export interface Deducciones {
  Deduccion: Deduccion[];
  TotalOtrasDeducciones: string;
  TotalImpuestosRetenidos: string;
}

export interface Deduccion {
  TipoDeduccion: string;
  Clave: string;
  Concepto: string;
  Importe: string;
}

export interface OtrosPagos {
  OtroPago: any;
}

export interface TimbreFiscalDigital {
  'xsi:schemaLocation': string;
  Version: string;
  UUID: string;
  FechaTimbrado: string;
  RfcProvCertif: string;
  SelloCFD: string;
  NoCertificadoSAT: string;
  SelloSAT: string;
}

export interface ImpuestosLocales {
  TrasladosLocales: TrasladosLocales;
  version: string;
  TotaldeRetenciones: string;
  TotaldeTraslados: string;
}

export interface TrasladosLocales {
  ImpLocTrasladado: string;
  TasadeTraslado: string;
  Importe: string;
}

export interface Pagos {
  Totales: Totales;
  Pago: Pago;
  Version: string;
}

export interface Totales {
  TotalTrasladosImpuestoIVA16: string;
  TotalTrasladosBaseIVA16: string;
  MontoTotalPagos: string;
}

export interface Pago {
  DoctoRelacionado: DoctoRelacionado;
  ImpuestosP: ImpuestosP;
  FechaPago: string;
  FormaDePagoP: string;
  MonedaP: string;
  TipoCambioP: string;
  Monto: string;
}

export interface DoctoRelacionado {
  ImpuestosDR: ImpuestosDr;
  IdDocumento: string;
  Serie: string;
  Folio: string;
  MonedaDR: string;
  EquivalenciaDR: string;
  NumParcialidad: string;
  ImpSaldoAnt: string;
  ImpPagado: string;
  ImpSaldoInsoluto: string;
  ObjetoImpDR: string;
}

export interface ImpuestosDr {
  TrasladosDR: TrasladosDr;
}

export interface TrasladosDr {
  TrasladoDR: TrasladoDr;
}

export interface TrasladoDr {
  BaseDR: string;
  ImpuestoDR: string;
  TipoFactorDR: string;
  TasaOCuotaDR: string;
  ImporteDR: string;
}

export interface ImpuestosP {
  TrasladosP: TrasladosP;
}

export interface TrasladosP {
  TrasladoP: TrasladoP;
}

export interface TrasladoP {
  BaseP: string;
  ImpuestoP: string;
  TipoFactorP: string;
  TasaOCuotaP: string;
  ImporteP: string;
}

export interface Divisas {
  version: string;
  tipoOperacion: string;
}

export interface Impuestos {
  Traslados?: Traslados;
  TotalImpuestosTrasladados?: string;
  Retenciones?: Retenciones;
  TotalImpuestosRetenidos?: string;
}

export interface Traslados {
  Traslado: DetailTaxes | DetailTaxes[];
}

export interface DetailTaxes {
  Base: string;
  Impuesto: TaxesType;
  TasaOCuota: string;
  Importe: string;
  TipoFactor: FactorType;
}

export interface Retenciones {
  Retencion: DetailTaxes | DetailTaxes[];
}
