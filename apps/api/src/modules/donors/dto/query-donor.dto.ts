import { IsOptional, IsNumberString, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryDonorDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @ApiPropertyOptional({ example: 'Tsering', description: 'Search by name or email' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'Monthly', description: 'Filter by donation type' })
  @IsOptional()
  @IsString()
  type?: string;
}
