import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from 'generated/prisma';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const prisma = new PrismaClient();

    return this.appService.getHello();
  }
}
