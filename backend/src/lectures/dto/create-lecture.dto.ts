import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IsNotEmpty } from "class-validator";

export class CreateLectureDto {
    @ApiProperty({ description: "강의 제목" })
    @IsString()
    @IsNotEmpty()
    title: string;
}