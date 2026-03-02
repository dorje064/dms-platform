import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { LoggingMiddleware } from './common/middleware/logging.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // CORS — allow web (3000) and backoffice (4201) in dev; read from env in production
  const rawOrigins = process.env['CORS_ORIGINS'];
  const allowedOrigins = rawOrigins
    ? rawOrigins.split(',').map((o) => o.trim())
    : [
      'http://localhost:3000', // Next.js web app
      'http://localhost:4200', // Vite fallback
      'http://localhost:4201', // React backoffice (bo)
    ];

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Logging middleware
  const httpAdapter = app.getHttpAdapter();
  const expressApp = httpAdapter.getInstance();
  const loggingMiddleware = new LoggingMiddleware();
  expressApp.use((req: unknown, res: unknown, next: () => void) =>
    loggingMiddleware.use(req as Parameters<typeof loggingMiddleware.use>[0], res as Parameters<typeof loggingMiddleware.use>[1], next),
  );

  // Swagger documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('DMS Platform API')
    .setDescription('Degyal Memorial Society - REST API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Admin Authentication')
    .addTag('students', 'Student Management')
    .addTag('donors', 'Donor Management')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  Logger.log(
    `📚 Swagger docs available at: http://localhost:${port}/${globalPrefix}/docs`,
  );
}

bootstrap();
