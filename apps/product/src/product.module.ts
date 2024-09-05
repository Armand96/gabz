import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './model/product.model';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: process.env.NODE_ENV ? `./apps/product/.env.${process.env.NODE_ENV}` : './apps/product/.env',
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
                models: [Product],
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
                models: [Product],
                timezone: "+07:00",
                autoLoadModels: true,
                synchronize: false, // Read-only; no need to sync models
            }),
            inject: [ConfigService],
        }),
        SequelizeModule.forFeature([Product], 'writeConnection'),
        SequelizeModule.forFeature([Product], 'readConnection'),
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule { }
