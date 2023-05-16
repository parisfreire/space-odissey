import { Logger } from '@nestjs/common';
import { Prompt } from '@space-odyssey/eva';

export abstract class AppService {

  protected readonly logger = new Logger(AppService.name);

  abstract getResponsePrompt(prompt: Prompt);
}
