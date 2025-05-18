import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import * as JsBarcode from 'jsbarcode';
import { createCanvas } from 'canvas';

@Injectable()
export class GeneratorService {
  /**
   * Generates QR code as PNG buffer
   * @param text Text to encode
   * @param options QR code options
   * @returns PNG image buffer
   */
  async generateQRCode(text: string, options: any = {}): Promise<Buffer> {
    const defaultOptions = {
      errorCorrectionLevel: 'H', // Highest error correction
      margin: 1,
      width: 300, // Default width
      ...options
    };

    return new Promise((resolve, reject) => {
      QRCode.toBuffer(
        text,
        {
          type: 'png',
          ...defaultOptions
        },
        (err, buffer) => {
          if (err) reject(err);
          else resolve(buffer);
        }
      );
    });
  }

  /**
   * Generates barcode as PNG buffer
   * @param text Text to encode
   * @param type Barcode type
   * @param options Barcode options
   * @returns PNG image buffer
   */
  async generateBarcode(text: string, type: string, options: any = {}): Promise<Buffer> {
    const defaultOptions = {
      width: 2,
      height: 100,
      displayValue: true,
      margin: 10,
      ...options
    };

    const canvas = createCanvas(300, 150);
    JsBarcode(canvas, text, {
      format: type,
      ...defaultOptions
    });

    return canvas.toBuffer('image/png');
  }
}