import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('resume-feedback')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
