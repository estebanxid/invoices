export class FileUtils {
  static isXmlFile(fileName: string): boolean {
    return fileName.endsWith('.xml');
  }
}
