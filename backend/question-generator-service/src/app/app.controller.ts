import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { InterviewQuestionDto } from './questions.dto';

@Controller('questions')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getData() {
    console.log('health');
    return this.appService.getData();
  }

  @Post('generate')
  async generate(@Body() body: InterviewQuestionDto) {
    console.log('reaching here');
    console.log(body);
    const { difficulty, techStack, count } = body;
    return await this.appService.generateQuestions(
      difficulty,
      techStack,
      count
    );
  }
}
