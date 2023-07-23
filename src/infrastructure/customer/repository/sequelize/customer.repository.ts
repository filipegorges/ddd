import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(customer: Customer): Promise<void> {
    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      city: customer.address.city,
      state: customer.address.state,
      zip: customer.address.zip,
      active: customer.isActive(),
    });
  }

  async update(customer: Customer): Promise<void> {
    await CustomerModel.update(
      {
        id: customer.id,
        name: customer.name,
        rewardPoints: customer.rewardPoints,
        street: customer.address.street,
        city: customer.address.city,
        state: customer.address.state,
        zip: customer.address.zip,
        active: customer.isActive(),
      },
      {
        where: { id: customer.id },
      }
    );
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(customerModel.id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.city,
      customerModel.state,
      customerModel.zip
    );
    customer.changeAddress(address);
    customer.addRewardPoints(customerModel.rewardPoints);
    if (customerModel.active) {
      customer.activate();
    }
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const response = await CustomerModel.findAll();
    return response.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(
        customerModel.street,
        customerModel.city,
        customerModel.state,
        customerModel.zip
      );
      customer.changeAddress(address);
      customer.addRewardPoints(customerModel.rewardPoints);
      if (customerModel.active) {
        customer.activate();
      }
      return customer;
    });
  }
}
