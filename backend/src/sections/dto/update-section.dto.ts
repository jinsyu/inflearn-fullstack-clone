import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { CreateSectionDto } from "./create-section.dto";



export class UpdateSectionDto extends PartialType(CreateSectionDto) {
    @ApiProperty({ description: "섹션 제목" })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ description: "섹션 설명", required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: "섹션 순서", required: false })
    @IsNumber()
    @IsOptional()
    order?: number;
}