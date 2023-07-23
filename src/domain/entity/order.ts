import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customer_id: string;
  private _items: OrderItem[];

  constructor(id: string, customerID: string, items: OrderItem[]) {
    this._id = id;
    this._customer_id = customerID;
    this._items = items;
    this.validate();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("ID is required");
    }
    if (this._customer_id.length === 0) {
      throw new Error("CustomerID is required");
    }
    if (this._items.length === 0) {
      throw new Error("Items are required");
    }
    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Quantity must be greater than zero");
    }
    return true;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
  }

  addItem(item: OrderItem): void {
    this._items.push(item);
  }

  get id(): string {
    return this._id;
  }
  
  get customer_id(): string {
    return this._customer_id;
  }

  get items(): OrderItem[] {
    return this._items;
  }

}
