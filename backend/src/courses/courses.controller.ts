import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CreateCourseDto } from './dto/create-course-dto';
import { Request } from 'express';
import { Prisma } from '@prisma/client';
import { UpdateCourseDto } from './dto/update-course-dto';
import { Course } from 'src/_gen/prisma-class/course';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: '코스를 생성합니다.',
    type: Course,
  })
  createCourse(@Req() req: Request, @Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.createCourse(req.user.sub, createCourseDto);
  }

  @Get()
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'level', required: false })
  @ApiQuery({ name: 'caregoryId', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  @ApiOkResponse({
    description: '코스 목록을 조회합니다.',
    type: Course,
    isArray: true,
  })
  findAllCourses(
    @Query('title') title?: string,
    @Query('level') level?: string,
    @Query('caregoryId') caregoryId?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    const where: Prisma.CourseWhereInput = {};
    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      };
    }
    if (level) {
      where.level = level;
    }
    if (caregoryId) {
      where.categories = {
        some: {
          id: caregoryId,
        },
      };
    }

    return this.coursesService.findAllCourses({
      where,
      skip: skip ? +skip : undefined,
      take: take ? +take : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Get(':id')
  @ApiQuery({
    name: 'include',
    required: false,
    description: 'include 속성에 원하는 관계를 추가할 수 있습니다.',
  })
  @ApiOkResponse({
    description: '코스 상세 정보를 조회합니다.',
    type: Course,
  })
  findOneCourse(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('include') include?: string,
  ) {
    const includeArray = include ? include.split(',') : undefined;

    return this.coursesService.findOneCourse(id, includeArray);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: '코스 정보를 수정합니다.',
    type: Course,
  })
  updateCourse(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.updateCourse(id, req.user.sub, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: '코스 정보를 삭제합니다.',
    type: Course,
  })
  deleteCourse(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    return this.coursesService.deleteCourse(id, req.user.sub);
  }
}
