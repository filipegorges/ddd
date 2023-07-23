import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import ProductModel from "../db/sequelize/model/product.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";
import OrderModel from "../db/sequelize/model/order.model";

describe("Order repository unit tests", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([
      OrderModel,
      CustomerModel,
      ProductModel,
      OrderItemModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new Order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "John Doe");
    const address = new Address("street", "city", "state", "zip");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "i1",
      product.id,
      product.name,
      product.price,
      2
    );
    
    const orderItem2 = new OrderItem(
      "i2",
      product.id,
      product.name,
      product.price,
      2
    );
    const order = new Order("o1", customer.id, [orderItem, orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: 40,
      items: [
        {
          id: orderItem.id,
          product_id: product.id,
          order_id: order.id,
          quantity: orderItem.quantity,
          name: product.name,
          price: product.price,
        },
        {
          id: orderItem2.id,
          product_id: product.id,
          order_id: order.id,
          quantity: orderItem2.quantity,
          name: product.name,
          price: product.price,
        },
      ],
    });
  });

  it("should update an existing Order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "John Doe");
    const address = new Address("street", "city", "state", "zip");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "i1",
      product.id,
      product.name,
      product.price,
      2
    );
    const order = new Order("o1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const newProduct = new Product("p2", "Product 2", 20);
    await productRepository.create(newProduct);

    const newOrderItem = new OrderItem(
      "i2",
      newProduct.id,
      newProduct.name,
      newProduct.price,
      3
    );
    order.addItem(newOrderItem);

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: 80,
      items: [
        {
          id: orderItem.id,
          product_id: product.id,
          order_id: order.id,
          quantity: orderItem.quantity,
          name: product.name,
          price: product.price,
        },
        {
          id: newOrderItem.id,
          product_id: newProduct.id,
          order_id: order.id,
          quantity: newOrderItem.quantity,
          name: newProduct.name,
          price: newProduct.price,
        },
      ],
    });
  });

  it("should find an existing Order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "John Doe");
    const address = new Address("street", "city", "state", "zip");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "i1",
      product.id,
      product.name,
      product.price,
      2
    );
    const order = new Order("o1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundOrder = await orderRepository.find(order.id);

    expect(foundOrder).toStrictEqual(order);
  });

  it("should find all existing Orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "John Doe");
    const address = new Address("street", "city", "state", "zip");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "i1",
      product.id,
      product.name,
      product.price,
      2
    );
    const order = new Order("o1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundOrders = await orderRepository.findAll();

    expect(foundOrders).toStrictEqual([order]);
  });
});
