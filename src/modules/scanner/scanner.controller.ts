// src/modules/scanner/scanner.controller.ts
import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { ScannerService } from './scanner.service';
import { ScanUrlDto } from './dto/scan-url.dto';
import { ScanBase64Dto } from './dto/scan-base64.dto';

@Controller('scan')
@ApiTags('Scanner')
export class ScannerController {
  constructor(private readonly scannerService: ScannerService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload an image containing QR/barcode',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Scan QR/Barcode from uploaded file' })
  @ApiResponse({ status: 200, description: 'Successfully scanned code' })
  @ApiResponse({ status: 400, description: 'No barcode found' })
  async scanUploadedFile(@UploadedFile() file: any) {
    return this.scannerService.scanFromBuffer(file.buffer);
  }

  @Post('url')
  @ApiOperation({ summary: 'Scan QR/Barcode from URL' })
  @ApiResponse({ status: 200, description: 'Successfully scanned code' })
  @ApiResponse({ status: 400, description: 'No barcode found' })
  async scanFromUrl(@Body() dto: ScanUrlDto) {
    const response = await fetch(dto.url);
    const buffer = await response.arrayBuffer();
    return this.scannerService.scanFromBuffer(Buffer.from(buffer));
  }

  @Post('base64')
  @ApiOperation({ summary: 'Scan QR/Barcode from base64 string' })
  @ApiResponse({ status: 200, description: 'Successfully scanned code' })
  @ApiResponse({ status: 400, description: 'No barcode found' })
  async scanFromBase64(@Body() dto: ScanBase64Dto) {
    const base64Data = dto.base64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    return this.scannerService.scanFromBuffer(buffer);
  }
}