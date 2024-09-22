import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from './products/products.controller';
import { ResponseDto } from './response.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ApiGatewayModule,
        ConfigModule.forRoot({
            envFilePath: process.env.NODE_ENV ? `./apps/api-gateway/.env.${process.env.NODE_ENV}` : './apps/api-gateway/.env',
        }),
        // HttpModule,
        ClientsModule.registerAsync({
            clients: [{
                name: "PRODUCT_SERVICE",
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get("PRODUCT_HOST"),
                        port: configService.get("PRODUCT_PORT")
                    }
                })
            }]
        }),
    ],
    controllers: [ApiGatewayController, ProductsController],
    providers: [ApiGatewayService, ResponseDto],
})
export class ApiGatewayModule { }
