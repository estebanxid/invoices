export interface ZipXmlExtractorAdapter {
  extractXmlFiles(file: Express.Multer.File): Promise<string[]>;
}

export const ZipXmlExtractorAdapter = Symbol.for('ZipXmlExtractorAdapter');
