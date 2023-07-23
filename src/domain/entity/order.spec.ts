import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Order("", "1", [])).toThrowError("ID is required");
  });

  it("should throw an error when customerID is empty", () => {
    expect(() => new Order("1", "", [])).toThrowError("CustomerID is required");
  });

  it("should throw an error when items is empty", () => {
    expect(() => new Order("1", "1", [])).toThrowError("Items are required");
  });

  it("should calculate total", () => {
    const order = new Order("1", "1", [
      new OrderItem("1", "1", "1", 10, 1),
      new OrderItem("2", "2", "2", 20, 1),
    ]);
    expect(order.total()).toBe(30);

    const order2 = new Order("1", "1", [
      new OrderItem("1", "1", "1", 10, 1),
      new OrderItem("2", "2", "2", 20, 1),
      new OrderItem("3", "3", "3", 30, 1),
    ]);
    expect(order2.total()).toBe(60);
  });
  
  it("should throw error if the item quantity is less than or eq to zero", () => {
        expect(
            () => new Order("1", "1", [
                new OrderItem("1", "1", "1", 10, 0)
            ])).toThrowError("Quantity must be greater than zero");
  });
});
