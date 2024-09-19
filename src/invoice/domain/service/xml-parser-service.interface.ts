export interface XmlParserService<T> {
  arrayToJsonList(xml: string[]): T[];
}

export const XmlParserService = Symbol.for('XmlParserService');
