import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository unit tests", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "John Doe");
    const address = new Address("Street", "City", "State", "ZipCode");
    customer.changeAddress(address);
    customer.addRewardPoints(10);
    await customerRepository.create(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: "c1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "c1",
      name: "John Doe",
      street: "Street",
      city: "City",
      state: "State",
      zip: "ZipCode",
      active: false,
      rewardPoints: 10,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "John Doe");
    const address = new Address("Street", "City", "State", "ZipCode");
    customer.changeAddress(address);
    await customerRepository.create(customer);
    customer.changeName("Jane Doe");
    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: "c1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "c1",
      name: "Jane Doe",
      street: "Street",
      city: "City",
      state: "State",
      zip: "ZipCode",
      active: false,
      rewardPoints: 0,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "John Doe");
    const address = new Address("Street", "City", "State", "ZipCode");
    customer.changeAddress(address);
    customer.addRewardPoints(10);
    await customerRepository.create(customer);
    const foundCustomer = await customerRepository.find("c1");

    expect(foundCustomer).toStrictEqual(customer);
  });

it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("c1", "John Doe");
    const address1 = new Address("Street", "City", "State", "ZipCode");
    customer1.changeAddress(address1);
    customer1.addRewardPoints(10);
    const customer2 = new Customer("c2", "Jane Doe");
    const address2 = new Address("Street", "City", "State", "ZipCode");
    customer2.changeAddress(address2);
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const foundCustomers = await customerRepository.findAll();

    expect(foundCustomers).toHaveLength(2);
    expect(foundCustomers).toContainEqual(customer1);
    expect(foundCustomers).toContainEqual(customer2);
});

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();
    expect(async () => {
      await customerRepository.find("c1");
    }).rejects.toThrow("Customer not found");
  });
});
