import { Test } from '@nestjs/testing';

import { ProductionAppService } from './production.app.service';

describe('AppService', () => {
  let service: ProductionAppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ProductionAppService],
    }).compile();

    service = app.get<ProductionAppService>(ProductionAppService);
  });

});
