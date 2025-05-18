import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course-dto';
import { UpdateCourseDto } from './dto/update-course-dto';
import slugify from 'slugify';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async createCourse(
    userId: string,
    createCourseDto: CreateCourseDto,
  ): Promise<Course> {
    const course = await this.prisma.course.create({
      data: {
        title: createCourseDto.title,
        slug: slugify(createCourseDto.title, { lower: true }),
        instructorId: userId,
        status: 'DRAFT',
      },
    });

    return course;
  }

  async findAllCourses(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CourseWhereUniqueInput;
    where: Prisma.CourseWhereInput;
    orderBy: Prisma.CourseOrderByWithRelationInput;
  }): Promise<Course[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.course.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOneCourse(id: string, include?: string[]): Promise<Course | null> {
    const includeObject = {};
    if (include) {
      include.forEach((item) => {
        includeObject[item.trim()] = true;
      });
    }

    const course = await this.prisma.course.findUnique({
      where: { id },
      include: include?.length > 0 ? includeObject : undefined,
    });

    return course;
  }

  async updateCourse(
    id: string,
    userId: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    const { categoryIds, ...otherData } = updateCourseDto;

    const course = await this.findOneCourse(id);

    if (!course) {
      throw new NotFoundException(`ID: ${id} 코스를 찾을 수 없습니다.`);
    }

    if (course.instructorId !== userId) {
      throw new UnauthorizedException(
        `ID: ${id} 코스를 수정할 권한이 없습니다.`,
      );
    }

    return await this.prisma.course.update({
      where: { id },
      data: {
        ...otherData,
        categories: categoryIds
          ? {
              connect: categoryIds.map((id) => ({ id })),
            }
          : undefined,
      },
    });
  }

  async deleteCourse(id: string, userId: string): Promise<Course> {
    const course = await this.findOneCourse(id);

    if (!course) {
      throw new NotFoundException(`ID: ${id} 코스를 찾을 수 없습니다.`);
    }

    if (course.instructorId !== userId) {
      throw new UnauthorizedException(
        `ID: ${id} 코스를 삭제할 권한이 없습니다.`,
      );
    }

    await this.prisma.course.delete({
      where: { id },
    });

    return course;
  }
}
