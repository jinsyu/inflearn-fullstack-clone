import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';

@Injectable()
export class SectionsService {
  constructor(private readonly prisma: PrismaService) { }

  async createSection(courseId: string, createSectionDto: CreateSectionDto, userId: string) {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      }
    })

    if (!course) {
      throw new NotFoundException('코스를 찾을 수 없습니다.');
    }

    if (course.instructorId !== userId) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    const lastSection = await this.prisma.section.findFirst({
      where: {
        courseId: courseId,
      },
      orderBy: {
        order: 'desc',
      }
    })

    const section = await this.prisma.section.create({
      data: {
        ...createSectionDto,
        order: lastSection ? lastSection.order + 1 : 0,
        course: {
          connect: {
            id: courseId
          }
        }
      }
    })

    return section;
  }
}
