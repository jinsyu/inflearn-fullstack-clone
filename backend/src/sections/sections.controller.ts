import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateSectionDto } from './dto/create-section.dto';
import { Request } from 'express';
import { Section } from 'src/_gen/prisma-class/section';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) { }

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
    @Req() req: Request,
  ) {
    return this.sectionsService.createSection(courseId, createSectionDto, req.user.sub);
  }
}
