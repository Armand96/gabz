import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './model/order.model';
import { OrderDetail } from './model/order.detail.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? `./apps/order/.env.${process.env.NODE_ENV}` : './apps/order/.env',
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      name: 'writeConnection',
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get('DB_WRITE_HOST'),
        port: parseInt(configService.get('DB_WRITE_PORT'), 10),
        username: configService.get('DB_WRITE_USERNAME'),
        password: configService.get('DB_WRITE_PASSWORD'),
        database: configService.get('DB_WRITE_NAME'),
        models: [Order, OrderDetail],
        autoLoadModels: true,
        timezone: "+07:00",
        synchronize: true, // Disable this in production
      }),
      inject: [ConfigService],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      name: 'readConnection',
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get('DB_READ_HOST'),
        port: parseInt(configService.get('DB_READ_PORT'), 10),
        username: configService.get('DB_READ_USERNAME'),
        password: configService.get('DB_READ_PASSWORD'),
        database: configService.get('DB_READ_NAME'),
        models: [Order, OrderDetail],
        timezone: "+07:00",
        autoLoadModels: true,
        synchronize: false, // Read-only; no need to sync models
      }),
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([Order, OrderDetail], 'writeConnection'),
    SequelizeModule.forFeature([Order, OrderDetail], 'readConnection'),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule { }
