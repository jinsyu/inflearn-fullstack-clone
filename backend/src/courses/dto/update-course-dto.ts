import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course-dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @ApiProperty({ description: '코스 짧은 설명', required: false })
  @IsString()
  @IsOptional()
  shortDescription?: string;

  @ApiProperty({ description: '코스 설명', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: '코스 썸네일 URL', required: false })
  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @ApiProperty({ description: '코스 가격', required: false })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ description: '코스 할인 가격', required: false })
  @IsNumber()
  @IsOptional()
  discountPrice?: number;

  @ApiProperty({
    description: '코스 레벨',
    required: false,
  })
  @IsOptional()
  level?: string;

  @ApiProperty({
    description: '코스 상태',
    required: false,
  })
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: '코스 카테고리 ID 목록',
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  categoryIds?: string[];
}
