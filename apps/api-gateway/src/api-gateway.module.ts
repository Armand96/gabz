import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from './products/products.controller';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ApiGatewayModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
    // HttpModule,
    ClientsModule.register([
      { name: 'PRODUCT_SERVICE', transport: Transport.TCP, options: { host: 'localhost', port: 3001 } },
    ]),
    OrderModule,
  ],
  controllers: [ApiGatewayController, ProductsController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule { }
