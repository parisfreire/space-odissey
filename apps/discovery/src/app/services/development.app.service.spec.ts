import { Test } from '@nestjs/testing';

import { DevelopmentAppService } from './development.app.service';
import { Prompt, PromptType } from '@space-odyssey/eva';

describe('AppService', () => {
  let service: DevelopmentAppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [DevelopmentAppService],
    }).compile();

    service = app.get<DevelopmentAppService>(DevelopmentAppService);
  });

  describe('getResponsePrompt', () => {
    it('should return mocked prompt response', () => {
      const prompt: Prompt = {
        id: 'id',
        text: 'text',
        type: PromptType.HUMAN
      }
      expect(service.getResponsePrompt(prompt)).toEqual({
        ...prompt,
        type: PromptType.MACHINE
      });
    });
  });
});
