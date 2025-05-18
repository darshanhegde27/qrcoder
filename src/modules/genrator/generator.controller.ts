import { Controller, Post, Body, Res, Header } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { GeneratorService } from './generator.service';
import { Response } from 'express';
import { GenerateQRDto } from './dto/generate-qr.dto';
import { GenerateBarcodeDto } from './dto/generate-barcode.dto';

@Controller('generate')
@ApiTags('Generator')
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) {}

  @Post('qrcode')
  @Header('Content-Type', 'image/png')
  @ApiOperation({ 
    summary: 'Generate QR Code Image',
    description: 'Generates a QR code image in PNG format'
  })
  @ApiResponse({
    status: 200,
    description: 'PNG image of the QR code',
    content: {
      'image/png': {
        schema: { type: 'string', format: 'binary' }
      }
    }
  })
  @ApiBody({ type: GenerateQRDto })
  async generateQR(
    @Body() dto: GenerateQRDto,
    @Res() res: Response
  ) {
    const imageBuffer = await this.generatorService.generateQRCode(dto.text, dto.options);
    res.send(imageBuffer);
  }

  @Post('barcode')
  @Header('Content-Type', 'image/png')
  @ApiOperation({ 
    summary: 'Generate Barcode Image',
    description: 'Generates a barcode image in PNG format'
  })
  @ApiResponse({
    status: 200,
    description: 'PNG image of the barcode',
    content: {
      'image/png': {
        schema: { type: 'string', format: 'binary' }
      }
    }
  })
  @ApiBody({ type: GenerateBarcodeDto })
  async generateBarcode(
    @Body() dto: GenerateBarcodeDto,
    @Res() res: Response
  ) {
    const imageBuffer = await this.generatorService.generateBarcode(
      dto.text,
      dto.type,
      dto.options
    );
    res.send(imageBuffer);
  }

  @Post('qrcode/download')
  @Header('Content-Type', 'image/png')
  @Header('Content-Disposition', 'attachment; filename="qrcode.png"')
  @ApiOperation({ 
    summary: 'Download QR Code',
    description: 'Generates and downloads a QR code as PNG file'
  })
  async downloadQR(
    @Body() dto: GenerateQRDto,
    @Res() res: Response
  ) {
    const imageBuffer = await this.generatorService.generateQRCode(dto.text, dto.options);
    res.send(imageBuffer);
  }

  @Post('barcode/download')
  @Header('Content-Type', 'image/png')
  @Header('Content-Disposition', 'attachment; filename="barcode.png"')
  @ApiOperation({ 
    summary: 'Download Barcode',
    description: 'Generates and downloads a barcode as PNG file'
  })
  async downloadBarcode(
    @Body() dto: GenerateBarcodeDto,
    @Res() res: Response
  ) {
    const imageBuffer = await this.generatorService.generateBarcode(
      dto.text,
      dto.type,
      dto.options
    );
    res.send(imageBuffer);
  }
}