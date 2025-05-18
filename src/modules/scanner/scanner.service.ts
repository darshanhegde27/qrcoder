import { Injectable } from '@nestjs/common';
import * as bwipjs from 'bwip-js';

@Injectable()
export class ScannerService {
  async scanFromBuffer(buffer: Buffer): Promise<any> {
    try {
      const result = await (bwipjs as any).decode({
        buffer: buffer,
      });
      return { 
        success: true, 
        data: result.text, 
        type: result.type,
        format: result.format 
      };
    } catch (error) {
      return { success: false, error: 'No barcode found' };
    }
  }
}