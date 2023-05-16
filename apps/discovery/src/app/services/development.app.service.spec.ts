import { Test } from '@nestjs/testing';

import { DevelopmentAppService } from './development.app.service';

describe('AppService', () => {
  let service: DevelopmentAppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [DevelopmentAppService],
    }).compile();

    service = app.get<DevelopmentAppService>(DevelopmentAppService);
  });

  describe('getData', () => {
    it('should return "Welcome to discovery!"', () => {
      expect(service.getData()).toEqual({ content: 'Welcome to discovery!' });
    });
  });
});
