import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { Prompt, PromptType } from '@space-odyssey/eva';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('submitPrompt', () => {
    it('should return a prompt response', () => {
      const prompt: Prompt = {
        id: 'id',
        text: 'text',
        type: PromptType.HUMAN
      }

      const appController = app.get<AppController>(AppController);
      expect(appController.submitPrompt(prompt)).toEqual({
        ...prompt,
        type: PromptType.MACHINE
      });
    });
  });
});
