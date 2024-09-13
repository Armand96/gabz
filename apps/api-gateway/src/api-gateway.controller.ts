import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { CreateProductDto } from '@app/general';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    @Inject('PRODUCT_SERVICE') private client: ClientProxy
  ) { }

  @Get('/test')
  getHello(): string {
    return this.apiGatewayService.getHello();
  }
}
