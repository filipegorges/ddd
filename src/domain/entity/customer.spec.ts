import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
      expect(() => {
        const address = new Address("1", "1", "1", "1");
        const customer = new Customer("", "John Doe");
        customer.changeAddress(address);
    }).toThrowError("ID is required");
  });

  it("should throw an error when name is empty", () => {
      expect(() => {
        const address = new Address("1", "1", "1", "1");
        const customer = new Customer("1", "");
        customer.changeAddress(address);
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    const address = new Address("1", "1", "1", "1");
    let customer = new Customer("1", "John Doe");
    customer.changeAddress(address);
    customer.changeName("Jane Doe");
    expect(customer.name).toBe("Jane Doe");
  });

  it("should activate customer", () => {
    const address = new Address("1", "1", "1", "1");
    let customer = new Customer("1", "John Doe");
    customer.changeAddress(address);
    customer.activate();
    expect(customer.isActive()).toBeTruthy();
  });

  it("should throw error when addres is undefined when you activate a customer", () => {
    expect(() => {
      let customer = new Customer("1", "John Doe");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should deactivate customer", () => {
    const address = new Address("1", "1", "1", "1");
    let customer = new Customer("1", "John Doe");
    customer.changeAddress(address);
    customer.deactivate();
    expect(customer.isActive()).toBeFalsy();
  });

  it("should add reward points", () => {
    const address = new Address("1", "1", "1", "1");
    let customer = new Customer("1", "John Doe");
    customer.changeAddress(address);
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
