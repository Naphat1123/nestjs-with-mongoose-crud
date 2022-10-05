import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('User Mongoose')
    .setDescription('User Mongoose')
    .setVersion('1.0')
    .addTag('user')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`Appllication running on :${await app.getUrl()}`);
  console.log(`Appllication documrnt running on :${await app.getUrl()}/api`);
}
bootstrap();
