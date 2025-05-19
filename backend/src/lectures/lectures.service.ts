import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { AuthUserId } from 'src/common/decorators/user.decorator';
import { UpdateLectureDto } from './dto/update-lecture.dto';
@Injectable()
export class LecturesService {
  constructor(private prisma: PrismaService) {}

  async createLecture(
    sectionId: string,
    createLectureDto: CreateLectureDto,
    @AuthUserId() userId: string,
  ) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: {
        course: {
          select: {
            instructorId: true,
          },
        },
      },
    });

    if (!section) {
      throw new NotFoundException('섹션을 찾을 수 없습니다.');
    }

    if (section.course.instructorId !== userId) {
      throw new ForbiddenException('섹션을 생성할 수 있는 권한이 없습니다.');
    }

    const lastLecture = await this.prisma.lecture.findFirst({
      where: {
        sectionId,
      },
      orderBy: {
        order: 'desc',
      },
    });

    const lecture = await this.prisma.lecture.create({
      data: {
        ...createLectureDto,
        order: lastLecture ? lastLecture.order + 1 : 0,
        section: {
          connect: {
            id: sectionId,
          },
        },
        course: {
          connect: {
            id: section.courseId,
          },
        },
      },
    });

    return lecture;
  }

  async updateLecture(
    lectureId: string,
    updateLectureDto: UpdateLectureDto,
    @AuthUserId() userId: string,
  ) {
    const lecture = await this.prisma.lecture.findUnique({
      where: { id: lectureId },
      include: {
        course: {
          select: {
            instructorId: true,
          },
        },
      },
    });

    if (!lecture) {
      throw new NotFoundException('강의를 찾을 수 없습니다.');
    }

    if (lecture.course.instructorId !== userId) {
      throw new ForbiddenException('강의를 수정할 수 있는 권한이 없습니다.');
    }

    const updatedLecture = await this.prisma.lecture.update({
      where: { id: lectureId },
      data: updateLectureDto,
    });

    return updatedLecture;
  }

  async deleteLecture(lectureId: string, @AuthUserId() userId: string) {
    const lecture = await this.prisma.lecture.findUnique({
      where: { id: lectureId },
      include: {
        course: {
          select: {
            instructorId: true,
          },
        },
      },
    });

    if (!lecture) {
      throw new NotFoundException('강의를 찾을 수 없습니다.');
    }

    if (lecture.course.instructorId !== userId) {
      throw new ForbiddenException('강의를 삭제할 수 있는 권한이 없습니다.');
    }

    const deletedLecture = await this.prisma.lecture.delete({
      where: { id: lectureId },
    });

    return deletedLecture;
  }

  async findOneLecture(lectureId: string, @AuthUserId() userId: string) {
    const lecture = await this.prisma.lecture.findUnique({
      where: { id: lectureId },
      include: {
        course: {
          select: {
            instructorId: true,
          },
        },
      },
    });

    if (!lecture) {
      throw new NotFoundException('강의를 찾을 수 없습니다.');
    }

    if (lecture.course.instructorId !== userId) {
      throw new ForbiddenException('강의를 조회할 수 있는 권한이 없습니다.');
    }

    return lecture;
  }
}
