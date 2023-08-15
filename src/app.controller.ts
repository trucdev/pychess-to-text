import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return {
      value: 'https://www.pychess.org/giwv6hK6',
      reading: '',
    };
  }

  @Post()
  @Render('index')
  async submit(@Body() body) {
    const str = await this.appService.getReadingText(body.link);
    return { value: 'https://www.pychess.org/giwv6hK6', reading: str };
  }
}
