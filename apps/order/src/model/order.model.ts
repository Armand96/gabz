import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { OrderDetail } from "./order.detail.model";

@Table
export class Order extends Model {
    @Column
    invoice: string;
    
    @Column
    total: number;

    @HasMany(() => OrderDetail)
    orderDetails: OrderDetail[];
}