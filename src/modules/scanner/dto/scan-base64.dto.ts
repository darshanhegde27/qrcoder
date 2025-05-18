import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ScanBase64Dto {
  @ApiProperty({ description: 'Base64 encoded image to scan' })
  @IsString()
  base64: string;
}