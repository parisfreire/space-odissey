import { AppService } from '../src/app/services/app.service';
import { ProductionAppService } from '../src/app/services/production.app.service';
import { DevelopmentAppService } from '../src/app/services/development.app.service';

export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  // Not used. Replace main.ts to get config from this file.
  port: parseInt(process.env.PORT, 10) || 3333
});

export const appServiceProvider = {
  provide: AppService,
  useClass:
    process.env.NODE_ENV === 'production'
      ? ProductionAppService
      : DevelopmentAppService,
};
