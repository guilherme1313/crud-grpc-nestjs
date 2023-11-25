import { NestFactory } from '@nestjs/core';
import { BolsaDeValoresModule } from './bolsa-de-valores.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BolsaDeValoresModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'ordersproto',
        protoPath: [join(__dirname, 'orders', 'proto', 'orders.proto')],
        loader: { keepCase: true },
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationExceptionFilter());
  await app.listen();
}
bootstrap();
