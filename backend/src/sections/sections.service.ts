import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionsService {
  constructor(private readonly prisma: PrismaService) {}

  async createSection(
    courseId: string,
    createSectionDto: CreateSectionDto,
    userId: string,
  ) {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

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
      },
    });

    const section = await this.prisma.section.create({
      data: {
        ...createSectionDto,
        order: lastSection ? lastSection.order + 1 : 0,
        course: {
          connect: {
            id: courseId,
          },
        },
      },
    });

    return section;
  }

  async updateSection(
    sectionId: string,
    updateSectionDto: UpdateSectionDto,
    userId: string,
  ) {
    const section = await this.findOneSection(sectionId, userId);

    if (!section) {
      throw new NotFoundException('섹션을 찾을 수 없습니다.');
    }

    if (section.course.instructorId !== userId) {
      throw new UnauthorizedException('섹션을 수정할 권한이 없습니다.');
    }

    return this.prisma.section.update({
      where: {
        id: sectionId,
      },
      data: updateSectionDto,
    });
  }

  async findOneSection(sectionId: string, userId: string) {
    const section = await this.prisma.section.findUnique({
      where: {
        id: sectionId,
      },
      include: {
        course: {
          select: {
            instructorId: true,
          },
        },
        lectures: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!section) {
      throw new NotFoundException('섹션을 찾을 수 없습니다.');
    }

    if (section.course.instructorId !== userId) {
      throw new UnauthorizedException('섹션을 조회할 권한이 없습니다.');
    }

    return section;
  }

  async deleteSection(sectionId: string, userId: string) {
    const section = await this.findOneSection(sectionId, userId);

    if (!section) {
      throw new NotFoundException('섹션을 찾을 수 없습니다.');
    }

    if (section.course.instructorId !== userId) {
      throw new UnauthorizedException('섹션을 삭제할 권한이 없습니다.');
    }

    await this.prisma.section.delete({
      where: {
        id: sectionId,
      },
    });

    return section;
  }
}
