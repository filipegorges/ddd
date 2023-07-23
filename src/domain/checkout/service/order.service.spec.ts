import Address from "../../customer/value-object/address";
import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";


describe("Order service unit tests", () => {
    it("should get total of all orders", () => {
        const item1 = new OrderItem("i1", "p1", "Item 1", 100, 1);
        const item2 = new OrderItem("i2", "p2", "Item 2", 200, 2); 
        const order1 = new Order("o1", "c1", [item1]);
        const order2 = new Order("o2", "c1", [item2]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(500);
    });

    it("should place an order", () => {
        const address = new Address("1", "1", "1", "1")
        const customer = new Customer("c1", "John Doe");
        customer.changeAddress(address);
        const item1 = new OrderItem("i1", "p1", "Item 1", 10, 1);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });
});