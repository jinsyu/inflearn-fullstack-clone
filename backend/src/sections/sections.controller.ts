import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { CreateSectionDto } from './dto/create-section.dto';
import { Request } from 'express';
import { Section } from 'src/_gen/prisma-class/section';
import { UpdateSectionDto } from './dto/update-section.dto';
import { AuthUserId } from 'src/common/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('강의 섹션')
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post('courses/:courseId/sections')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '섹션 생성' })
  @ApiParam({ name: 'courseId', type: String, description: '코스 ID' })
  @ApiBody({ type: CreateSectionDto })
  @ApiOkResponse({ type: Section, description: '섹션 생성 성공' })
  createCourse(
    @Param('courseId') courseId: string,
    @Body() createSectionDto: CreateSectionDto,
    @AuthUserId() userId: string,
  ) {
    return this.sectionsService.createSection(
      courseId,
      createSectionDto,
      userId,
    );
  }

  @Get('/:sectionId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '섹션 조회' })
  @ApiParam({ name: 'sectionId', type: String, description: '섹션 ID' })
  @ApiOkResponse({ type: Section, description: '섹션 조회 성공' })
  findOneSection(
    @Param('sectionId') sectionId: string,
    @AuthUserId() userId: string,
  ) {
    return this.sectionsService.findOneSection(sectionId, userId);
  }

  @Patch('/:sectionId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '섹션 수정' })
  @ApiParam({ name: 'sectionId', type: String, description: '섹션 ID' })
  @ApiBody({ type: UpdateSectionDto })
  updateSection(
    @Param('sectionId') sectionId: string,
    @Body() updateSectionDto: UpdateSectionDto,
    @AuthUserId() userId: string,
  ) {
    return this.sectionsService.updateSection(
      sectionId,
      updateSectionDto,
      userId,
    );
  }

  @Delete('/:sectionId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '섹션 삭제' })
  @ApiParam({ name: 'sectionId', type: String, description: '섹션 ID' })
  @ApiOkResponse({ type: Section, description: '섹션 삭제 성공' })
  deleteSection(
    @Param('sectionId') sectionId: string,
    @AuthUserId() userId: string,
  ) {
    return this.sectionsService.deleteSection(sectionId, userId);
  }
}
