import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CapabilityDto {
  // capability
  @ApiProperty({ example: 1 })
  @IsNumber()
  @Expose()
  userId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Expose()
  capabilityId: number;

  @ApiProperty({ example: '리더십' })
  @IsString()
  @Expose()
  keyword: string;
}
