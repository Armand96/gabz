import { Body, Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '@app/general';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateProductDto } from '../../../libs/general/src/dto/product/update-product.dto';

@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    // @Post()
    @MessagePattern('createProduct')
    create(@Payload() createProductDto: CreateProductDto) {
        return this.productService.createProduct(createProductDto);
    }

    // @Get()
    @MessagePattern('getAllProduct')
    getAll() {
        return this.productService.getAllProducts();
    }

    // @Get(':id')
    @MessagePattern('getOneProduct')
    getOne(@Payload() id: number) {
        return this.productService.getOneProduct(id);
    }

    // @Patch(':id')
    @MessagePattern('updateProduct')
    update(@Payload() data: {id:number; updateProductDto: UpdateProductDto}) {
        return this.productService.updateProduct(data.id, data.updateProductDto);
    }

    // @Delete(':id')
    @MessagePattern('deleteProduct')
    delete(@Payload() id: number) {
        return this.productService.deleteProduct(+id);
    }
}
