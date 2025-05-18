import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject } from 'class-validator';

export class GenerateQrDto {
  @ApiProperty({ description: 'Text to encode in QR code' })
  @IsString()
  text: string;

  @ApiProperty({ 
    description: 'QR code options',
    required: false,
    example: {
      errorCorrectionLevel: 'H',
      margin: 1,
      scale: 8
    }
  })
  @IsObject()
  @IsOptional()
  options?: any;
}