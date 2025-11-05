import {
  Controller,
  All,
  Req,
  Query,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly http: HttpService) {}

  private routeMap: Record<string, string> = {
    'resume-feedback': 'http://localhost:3001',
    'interview-simulator': 'http://localhost:3002',
    questions: 'http://localhost:3003',
    'user-tracker': 'http://localhost:3003',
  };

  @All('*')
  async proxy(@Req() req: Request, @Query() query: any, @Body() body: any) {
    const path = req.url.split('?')[0];

    const baseRoute = path.replace(/^\/+/, '').split('/')[1];
    console.log(path);
    console.log(baseRoute);
    console.log(this.routeMap[baseRoute]);
    console.log(body);
    // console.log(targetUrl);

    // 🔁 Route to frontend shell if path starts with /interview-genius
    if (path.startsWith('/interview-genius')) {
      const shellUrl = `http://localhost:4200${path}`;
      const response = await firstValueFrom(
        this.http.request({
          method: req.method,
          url: shellUrl,
          headers: req.headers as unknown as Record<string, string>,
          data: body,
          params: query,
        })
      );
      return response.data;
    }

    // 🔁 Route to backend services
    const targetUrl = this.routeMap[baseRoute];
    if (!targetUrl) {
      throw new HttpException('Route not founds', HttpStatus.NOT_FOUND);
    }

    const response = await firstValueFrom(
      this.http.request({
        method: req.method,
        url: `${targetUrl}${path}`,
        headers: req.headers as unknown as Record<string, string>,
        data: body,
        params: query,
      })
    );

    return response.data;
  }
}
