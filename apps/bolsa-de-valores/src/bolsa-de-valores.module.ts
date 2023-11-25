import 'dotenv/config';
import { Module } from '@nestjs/common';
import { BolsaDeValoresController } from './bolsa-de-valores.controller';
import { BolsaDeValoresService } from './bolsa-de-valores.service';
import { OrdersModule } from './orders/orders.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './orders/entities/order.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      synchronize: true,
      define: {
        timestamps: false,
      },
      models: [Order],
    }),
    OrdersModule
  ],
  controllers: [BolsaDeValoresController],
  providers: [BolsaDeValoresService],
  exports: [SequelizeModule],
})
export class BolsaDeValoresModule {}
