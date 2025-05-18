import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject } from 'class-validator';

export class GenerateBarcodeDto {
  @ApiProperty({ description: 'Text to encode in barcode' })
  @IsString()
  text: string;

  @ApiProperty({ 
    description: 'Barcode type',
    enum: [
      'CODE128', 'CODE128A', 'CODE128B', 'CODE128C',
      'EAN13', 'EAN8', 'EAN5', 'EAN2', 'UPC', 'CODE39',
      'ITF14', 'MSI', 'MSI10', 'MSI11', 'MSI1010', 'MSI1110',
      'pharmacode', 'codabar'
    ]
  })
  @IsString()
  type: string;

  @ApiProperty({ 
    description: 'Barcode options',
    required: false,
    example: {
      displayValue: true,
      width: 2,
      height: 100
    }
  })
  @IsObject()
  @IsOptional()
  options?: any;
}