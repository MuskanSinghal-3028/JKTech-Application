import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities/entity-index';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { GoogleStrategy } from './auth/strategies/google';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { BodyParserMiddleware } from './middleware/body-parser.middleware';
import { BodyParserUrlMiddleware } from './middleware/body-parser-url.middleware';
import { GoogleAuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [TerminusModule, HttpModule, ConfigModule.forRoot({
    isGlobal:true,
    envFilePath: `.env.dev`
  }) ,
  PassportModule.register({ defaultStrategy: 'google' }), 
  JwtModule.register({
    secret: 'myKey', 
    signOptions: { expiresIn: '1h' }, 
  }),
  TypeOrmModule.forRootAsync({
    useFactory: (config: ConfigService) => ({
      type: "postgres",
      host: config.get<string>('DATABASE_HOST'),
      port: config.get('DATABASE_PORT'),
      username: config.get<string>('DATABASE_USER'),
      password: config.get<string>('DATABASE_PASSWORD'),
      database: config.get<string>('DATABASE_NAME'),
      schema: config.get<string>('DATABASE_SCHEMA_NAME'),
      entities: entities,
      synchronize: false
    }),inject: [ConfigService]
  }),
  TypeOrmModule.forFeature(entities)
],
  controllers: [AppController, AuthController, PostsController],
  providers: [AppService, AuthService,GoogleStrategy, PostsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BodyParserMiddleware)
      .forRoutes(
        { path: '*', method: RequestMethod.ALL },
        
      );

    consumer
      .apply(GoogleAuthMiddleware)
      .exclude(
        { path: 'auth/google', method: RequestMethod.ALL },
        { path: 'auth/google/callback', method: RequestMethod.ALL },
        { path: 'posts/generate-test-data', method: RequestMethod.ALL },

      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
      
  }
}
