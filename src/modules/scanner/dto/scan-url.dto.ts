import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class ScanUrlDto {
  @ApiProperty({ description: 'URL of the image to scan' })
  @IsString()
  @IsUrl()
  url: string;
}