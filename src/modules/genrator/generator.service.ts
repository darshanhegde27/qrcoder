import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import * as JsBarcode from 'jsbarcode';
import { createCanvas } from 'canvas';

@Injectable()
export class GeneratorService {
  async generateQRCode(text: string, options: any = {}): Promise<string> {
    const defaultOptions = {
      errorCorrectionLevel: 'H',
      margin: 1,
      scale: 8,
      ...options
    };
    return QRCode.toDataURL(text, defaultOptions);
  }

  async generateBarcode(text: string, type: string, options: any = {}): Promise<string> {
    const canvas = createCanvas(300, 150);
    JsBarcode(canvas, text, { 
      format: type,
      displayValue: true,
      ...options
    });
    return canvas.toDataURL('image/png');
  }
}