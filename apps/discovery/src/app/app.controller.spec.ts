import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './services/development.app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to discovery!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual(
       'Welcome to discovery!',
      );
    });
  });
});
