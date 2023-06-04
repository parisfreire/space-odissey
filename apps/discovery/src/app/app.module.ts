import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { appServiceProvider, configuration } from '../../config/configuration';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { UsageModule } from './usage/usage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/apps/discovery/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true
    }),
    // Serving static data. Not needed for local imports.
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, 'assets'),
    // }),
    MongooseModule.forRoot('mongodb://root:password@mongodb:27017/billing'),
    HttpModule,
    UsageModule
  ],
  controllers: [AppController],
  providers: [appServiceProvider],
})
export class AppModule {}

