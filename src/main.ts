import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import ConverterUtil from './utils/converter.util';
import { EnviromentVariablesEnum } from './enums/enviroment.variables.enum';

async function bootstrap() {

  const enviroment = process.env.NODE_ENV.toUpperCase();

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalFilters(new HttpExceptionFilter());

  const logger = new Logger('main');

  const enabledCors = ConverterUtil.parseBoolean(configService.get(EnviromentVariablesEnum.ENABLE_CORS));

  if (enabledCors) {
    const corsOptions = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
      allowedHeaders: 'Content-Type, Accept, Authorization'
    };
    app.enableCors(corsOptions);

    logger.debug('CORS ENABLED');
  }

  const enabledDocs = ConverterUtil.parseBoolean(configService.get(EnviromentVariablesEnum.ENABLE_DOCS));

  if (enabledDocs) {
    const swaggerOptions = new DocumentBuilder()
      .setTitle(`R2 Crypto API | ${enviroment}`)
      .setVersion('0.0.1')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      )
      .build();

    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('docs', app, document);

    logger.debug('ENABLE DOCS');
  }

  const port = configService.get(EnviromentVariablesEnum.PORT) || 3000;
  await app.listen(port);
  logger.log(`${enviroment} | R2 Crypto API started at port ${port}`);
}
bootstrap();
