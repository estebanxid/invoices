import { Injectable } from '@nestjs/common';
import * as unzipper from 'unzipper';
import { FileUtils } from '@shared/file.utils';
import { ZipXmlExtractorAdapter } from '@invoice/domain/adapter/zip-xml-extractor.adapter';

@Injectable()
export class ZipXmlExtractorAdapterImpl implements ZipXmlExtractorAdapter {
  async extractXmlFiles(file: Express.Multer.File): Promise<string[]> {
    if (!file.buffer || file.buffer.length === 0) {
      throw new Error('El archivo ZIP está vacío o es inválido');
    }

    const xmlFiles: string[] = [];

    try {
      const directory = await unzipper.Open.buffer(file.buffer);

      for (const entry of directory.files) {
        const fileName = entry.path;

        if (FileUtils.isXmlFile(fileName)) {
          const content = await entry.buffer();
          let s = content.toString('utf8');
          s += `<file>${fileName}</file>`;
          xmlFiles.push(s);
        }
      }

      return xmlFiles;
    } catch (error) {
      console.error('Error al descomprimir el archivo:', error);
      throw new Error('Error al procesar el archivo ZIP');
    }
  }
}
