import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { IsNotEmpty } from "class-validator";
import { CreateLectureDto } from "./create-lecture.dto";

export class UpdateLectureDto extends PartialType(CreateLectureDto) {
    @ApiProperty({ description: "개별 강의 설명", required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: "개별 강의 순서", required: false })
    @IsNumber()
    @IsOptional()
    order?: number;

    @ApiProperty({ description: "개별 강의 시간", required: false })
    @IsNumber()
    @IsOptional()
    duration?: number;

    @ApiProperty({ description: "개별 강의 미리보기 여부", required: false })
    @IsBoolean()
    @IsOptional()
    isPreview?: boolean;

    @ApiProperty({ description: "개별 강의 비디오 정보", required: false })
    @IsObject()
    @IsOptional()
    videoStorageInfo?: Record<string, any>;
}