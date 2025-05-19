import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AccessTokenGuard } from './auth/guards/access-token.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthUserId } from './common/decorators/user.decorator';
import { PrismaService } from './prisma/prisma.service';
import { User } from './_gen/prisma-class/user';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('/auth/me')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: '현재 로그인한 사용자 정보를 반환합니다.',
    type: User,
  })
  async testUser(@AuthUserId() userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
