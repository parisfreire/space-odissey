import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { DevelopmentAppService } from './services/development.app.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '../../config/configuration';
import { HttpModule } from '@nestjs/axios';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProductionAppService } from './services/production.app.service';
import { AppService } from './services/app.service';

const appServiceProvider = {
  provide: AppService,
  useClass:
    process.env.NODE_ENV === 'production'
      ? ProductionAppService
      : DevelopmentAppService,
};
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/apps/discovery/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true
    }),
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'assets'),
    }),
  ],
  controllers: [AppController],
  providers: [appServiceProvider],
})
export class AppModule {}

