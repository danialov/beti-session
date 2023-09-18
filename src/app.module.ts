import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import sessionConfig from './config/session.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivityMiddleware } from './middleware/activity.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RedisProvider } from './config/redis.provider';
import {AuthModule} from "./modules/auth/auth.module";
import {UserModule} from "./modules/user/user.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [sessionConfig],
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        AuthModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService, RedisProvider],
})
export class AppModule implements NestModule {
    constructor(private readonly configService: ConfigService) {}

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(session(this.configService.get('session')))
            .forRoutes({ path: '*', method: RequestMethod.ALL });
        consumer
            .apply(ActivityMiddleware)
            .forRoutes({ path: 'auth/check-activity', method: RequestMethod.GET });
    }
}