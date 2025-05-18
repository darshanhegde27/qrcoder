import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject } from 'class-validator';

export class GenerateQRDto {
  @ApiProperty({
    description: 'Text to encode in the QR code',
    example: 'https://example.com'
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: 'QR code generation options',
    required: false,
    example: {
      width: 300,
      errorCorrectionLevel: 'H',
      margin: 1
    }
  })
  @IsObject()
  @IsOptional()
  options?: any;
}