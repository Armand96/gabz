import { CreateProductDto } from '@app/general';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './model/product.model';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product, 'writeConnection') private productWriteModel: typeof Product,
        @InjectModel(Product, 'readConnection') private productReadModel: typeof Product,
        // @Inject('Sequelize') private sequelize: Sequelize,
    ) { }

    getHello(): string {
        return 'Hello World!';
    }

    async createProduct(data: CreateProductDto): Promise<Product> {
        return this.productWriteModel.create(data as any);
    }

    async getAllProducts(): Promise<Product[]> {
        return this.productReadModel.findAll();
    }

    async getOneProduct(id: number): Promise<Product> {
        return this.productReadModel.findOne({ where: { id } });
    }

    async updateProduct(id: number, data: UpdateProductDto): Promise<[number]> {
        return this.productWriteModel.update(data as any, { where: { id } });
    }

    async deleteProduct(id: number): Promise<void> {
        await this.productWriteModel.destroy({ where: { id } });
    }

}
