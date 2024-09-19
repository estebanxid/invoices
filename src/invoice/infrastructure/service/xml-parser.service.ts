import { XmlParserService } from '@invoice/domain/service/xml-parser-service.interface';
import { Injectable } from '@nestjs/common';
import { X2jOptions, XMLParser } from 'fast-xml-parser';

@Injectable()
export class XmlParserServiceImpl<T> implements XmlParserService<T> {
  arrayToJsonList(xml: string[]): T[] {
    const options: Partial<X2jOptions> = {
      ignoreAttributes: false,
      attributeNamePrefix: '',
      transformTagName: (tagName) => {
        const [, cleanTagName] = tagName.split(':');
        return cleanTagName || tagName;
      },
    };

    const parser = new XMLParser(options);
    return xml.map((xmlString) => parser.parse(xmlString));
  }
}
