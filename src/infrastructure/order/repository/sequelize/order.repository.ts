import { Transaction } from "sequelize";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";


export default class OrderRepository implements OrderRepositoryInterface {
  async create(order: Order): Promise<void> {
    await OrderModel.create(
      {
        id: order.id,
        customer_id: order.customer_id,
        total: order.total(),
        items: order.items.map((item) => ({
          id: item.id,
          product_id: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  async update(order: Order): Promise<void> {
    const transaction: Transaction = await OrderModel.sequelize.transaction();
    try {
      await OrderItemModel.destroy({
        where: { order_id: order.id },
        transaction,
      });

      await OrderItemModel.bulkCreate(
        order.items.map((item) => ({
          id: item.id,
          product_id: item.productId,
          order_id: order.id,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
        })),
        {
          transaction,
        }
      );

      await OrderModel.update(
        {
          customer_id: order.customer_id,
          total: order.total(),
        },
        {
          where: { id: order.id },
          transaction,
        }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  async find(id: string): Promise<Order> {
    const order = await OrderModel.findOne({
      where: { id },
      include: ["items"],
    });
    return new Order(
        order.id,
        order.customer_id,
        order.items.map((item) => new OrderItem(
            item.id,
            item.product_id,
            item.name,
            item.price,
            item.quantity
        ))
    );
  }
  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
        include: ["items"],
    });
    return orders.map((order) => new Order(
        order.id,
        order.customer_id,
        order.items.map((item) => new OrderItem(
            item.id,
            item.product_id,
            item.name,
            item.price,
            item.quantity
        ))
    ));
  }
}
