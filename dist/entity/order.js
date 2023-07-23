"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(id, customerID, items) {
        this._id = id;
        this._customerID = customerID;
        this._items = items;
    }
    total() {
        return this._items.reduce((total, item) => total + item._price, 0);
    }
}
exports.default = Order;
