import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LecturesService } from './lectures.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { Lecture } from 'src/_gen/prisma-class/lecture';
import { AuthUserId } from 'src/common/decorators/user.decorator';
import { UpdateLectureDto } from './dto/update-lecture.dto';

@ApiTags('개별 강의')
@Controller('lectures')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}

  @Post('sections/:sectionId/lectures')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '강의 생성' })
  @ApiBody({ type: CreateLectureDto })
  @ApiOkResponse({ type: Lecture, description: '강의 생성 성공' })
  createLecture(
    @Param('sectionId') sectionId: string,
    @Body() createLectureDto: CreateLectureDto,
    @AuthUserId() userId: string,
  ) {
    return this.lecturesService.createLecture(
      sectionId,
      createLectureDto,
      userId,
    );
  }

  @Get(':lectureId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '강의 조회' })
  @ApiOkResponse({ type: Lecture, description: '강의 조회 성공' })
  findOneLecture(
    @Param('lectureId') lectureId: string,
    @AuthUserId() userId: string,
  ) {
    return this.lecturesService.findOneLecture(lectureId, userId);
  }

  @Patch(':lectureId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '강의 수정' })
  @ApiBody({ type: UpdateLectureDto })
  @ApiOkResponse({ type: Lecture, description: '강의 수정 성공' })
  updateLecture(
    @Param('lectureId') lectureId: string,
    @Body() updateLectureDto: UpdateLectureDto,
    @AuthUserId() userId: string,
  ) {
    return this.lecturesService.updateLecture(
      lectureId,
      updateLectureDto,
      userId,
    );
  }

  @Delete(':lectureId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '강의 삭제' })
  @ApiOkResponse({ type: Lecture, description: '강의 삭제 성공' })
  deleteLecture(
    @Param('lectureId') lectureId: string,
    @AuthUserId() userId: string,
  ) {
    return this.lecturesService.deleteLecture(lectureId, userId);
  }
}
