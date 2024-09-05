import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './model/product.model';
import { join } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            // envFilePath: join(__dirname, '/apps/product/.env'),
            isGlobal: true,
        }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            name: 'writeConnection',
            useFactory: (configService: ConfigService) => ({
                dialect: 'mysql',
                // host: configService.get('DB_WRITE_HOST'),
                // port: parseInt(configService.get('DB_WRITE_PORT'), 10),
                // username: configService.get('DB_WRITE_USERNAME'),
                // password: configService.get('DB_WRITE_PASSWORD'),
                // database: configService.get('DB_WRITE_NAME'),
                host: configService.get('DB_WRITE_HOST', 'localhost'),
                port: parseInt(configService.get('DB_WRITE_PORT', '3307'), 10),
                username: configService.get('DB_WRITE_USERNAME', 'product_user'),
                password: configService.get('DB_WRITE_PASSWORD', 'developer'),
                database: configService.get('DB_WRITE_NAME', 'product_write_db'),
                models: [Product],
                autoLoadModels: true,
                synchronize: true, // Disable this in production
            }),
            inject: [ConfigService],
        }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            name: 'readConnection',
            useFactory: (configService: ConfigService) => ({
                dialect: 'mysql',
                // host: configService.get('DB_READ_HOST', 'localhost'),
                // port: parseInt(configService.get('DB_READ_PORT', '33017'), 10),
                // username: configService.get('DB_READ_USERNAME', 'product_user'),
                // password: configService.get('DB_READ_PASSWORD', 'developer'),
                // database: configService.get('DB_READ_NAME', 'product_read_db'),
                host: configService.get('DB_READ_HOST'),
                port: parseInt(configService.get('DB_READ_PORT'), 10),
                username: configService.get('DB_READ_USERNAME'),
                password: configService.get('DB_READ_PASSWORD'),
                database: configService.get('DB_READ_NAME'),
                models: [Product],
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
