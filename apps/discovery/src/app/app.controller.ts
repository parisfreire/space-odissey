import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';

import { Prompt } from '@space-odyssey/eva';
import { HttpLoggingInterceptor } from './logging.interceptor';
import { AppService } from './services/app.service';

@Controller('discovery')
@UseInterceptors(HttpLoggingInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async submitPrompt(@Body() prompt: Prompt): Promise<Prompt> {
    return await this.appService.getResponsePrompt(prompt);
  }
}
