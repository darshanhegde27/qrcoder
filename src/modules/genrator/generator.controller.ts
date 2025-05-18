// src/modules/generator/generator.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GeneratorService } from './generator.service';
import { GenerateQrDto } from './dto/generate-qr.dto';
import { GenerateBarcodeDto } from './dto/generate-barcode.dto';

@Controller('generate')
@ApiTags('Generator')
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) {}

  @Post('qrcode')
  @ApiOperation({ summary: 'Generate QR Code' })
  @ApiResponse({ status: 200, description: 'QR code generated successfully' })
  async generateQR(@Body() dto: GenerateQrDto): Promise<{ image: string }> {
    const image = await this.generatorService.generateQRCode(dto.text, dto.options);
    return { image };
  }

  @Post('barcode')
  @ApiOperation({ summary: 'Generate Barcode' })
  @ApiResponse({ status: 200, description: 'Barcode generated successfully' })
  async generateBarcode(@Body() dto: GenerateBarcodeDto): Promise<{ image: string }> {
    const image = await this.generatorService.generateBarcode(
      dto.text,
      dto.type,
      dto.options
    );
    return { image };
  }
}