import { Order } from "./order.model";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";

@Table
export class OrderDetail extends Model {

    @ForeignKey(() => Order)
    @Column
    orderId: number;

    @BelongsTo(() => Order)
    order: Order;

    @Column
    productId: number;
    
    @Column
    productName: string;

    @Column
    productPrice: number;

    @Column
    quantity: number;

}