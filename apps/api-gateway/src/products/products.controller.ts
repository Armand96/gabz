import { CreateProductDto, Product, UpdateProductDto } from '@app/general';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { catchError, map, Observable, of } from 'rxjs';
import { ResponseDto } from '../response.dto';
import { ConfigService } from '@nestjs/config';

@Controller('products')
export class ProductsController {

    constructor(
        // @Inject('PRODUCT_SERVICE') private client: ClientProxy, // use this for persistent TCP connection (load balancing is kinda hard)
        private configService: ConfigService,
        private res: ResponseDto<Product>,
    ) { }

    // use this for close connection TCP, so the docker can load balance it since it is not persistence TCP connection
    private createClient(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: this.configService.get('PRODUCT_HOST'),
                port: this.configService.get('PRODUCT_PORT'),
            },
        });
    }

    @Get()
    async getAll() {
        const client = this.createClient();
        return client.send('getAllProduct', {}).pipe(
            map(this.res.mapData),
            catchError(this.res.handleError)
        );
    }

    @Get(':id')
    getOneProduct(@Param('id') id: number) {
        const client = this.createClient();
        return client.send('getOneProduct', id).pipe(map(this.res.mapData), catchError(this.res.handleError));
    }

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto) {
        const client = this.createClient();
        return client.send('createProduct', createProductDto).pipe(map(this.res.mapData), catchError(this.res.handleError));
    }

    @Put(':id')
    updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
        const client = this.createClient();
        // console.log(id);
        return client.send('updateProduct', { id: id, updateProductDto: updateProductDto }).pipe(map(this.res.mapData), catchError(this.res.handleError));
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: number) {
        const client = this.createClient();
        return client.send('deleteProduct', id).pipe(map(this.res.mapData), catchError(this.res.handleError));
    }
}
