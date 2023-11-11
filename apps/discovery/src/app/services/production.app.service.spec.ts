import { Test } from '@nestjs/testing';

import { ProductionAppService } from './production.app.service';
import { Prompt, PromptType } from '@space-odyssey/eva';

describe('AppService', () => {
  let service: ProductionAppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ProductionAppService],
    }).compile();

    service = app.get<ProductionAppService>(ProductionAppService);
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
