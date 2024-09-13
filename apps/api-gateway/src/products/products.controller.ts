import { CreateProductDto, Product, UpdateProductDto } from '@app/general';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, Observable, of } from 'rxjs';
import { ResponseDto } from '../response.dto';

@Controller('products')
export class ProductsController {

    constructor(
        @Inject('PRODUCT_SERVICE') private client: ClientProxy,
        private res: ResponseDto<Product>,
    ) { }

    @Get()
    async getAll() {
        return this.client.send('getAllProduct', {}).pipe(
            map(this.res.mapData),
            catchError(this.res.handleError)
        );
    }

    @Get(':id')
    getOneProduct(@Param('id') id: number) {
        return this.client.send('getOneProduct', id).pipe(map(this.res.mapData), catchError(this.res.handleError));
    }

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto) {
        return this.client.send('createProduct', createProductDto).pipe(map(this.res.mapData), catchError(this.res.handleError));
    }

    @Put(':id')
    updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
        // console.log(id);
        return this.client.send('updateProduct', { id: id, updateProductDto: updateProductDto }).pipe(map(this.res.mapData), catchError(this.res.handleError));
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: number) {
        return this.client.send('deleteProduct', id).pipe(map(this.res.mapData), catchError(this.res.handleError));
    }
}
