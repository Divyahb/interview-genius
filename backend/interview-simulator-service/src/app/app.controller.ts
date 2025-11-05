import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('interview-simulator')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    console.log('getData, am i here');
    return this.appService.getData();
  }
}
