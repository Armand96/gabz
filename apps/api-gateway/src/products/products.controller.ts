import { CreateProductDto, UpdateProductDto } from '@app/general';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {

    constructor(
        @Inject('PRODUCT_SERVICE') private client: ClientProxy
    ) {}

    @Get()
    getAl() {
        return this.client.send('getAllProduct', {});
    }

    @Get(':id')
    getOneProduct(@Param('id') id: number) {
        return this.client.send('getOneProduct', id);
    }

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto) {
        return this.client.send('createProduct', createProductDto);
    }

    @Put(':id')
    updateProduct(@Param('id') id:number, @Body() updateProductDto: UpdateProductDto) {
        // console.log(id);
        return this.client.send('updateProduct', {id:id,updateProductDto:updateProductDto});
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: number) {
        return this.client.send('deleteProduct', id);
    }
}
