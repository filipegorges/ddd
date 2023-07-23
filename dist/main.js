"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./entity/address"));
const customer_1 = __importDefault(require("./entity/customer"));
const order_1 = __importDefault(require("./entity/order"));
const order_item_1 = __importDefault(require("./entity/order_item"));
let customer = new customer_1.default("123", "John Doe");
const address = new address_1.default("123", "City", "State", "Zip");
customer.Address = address;
customer.activate();
const item1 = new order_item_1.default("1", "Item 1", 10);
const item2 = new order_item_1.default("2", "Item 2", 20);
const order = new order_1.default("1", "123", [item1, item2]);
