"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Address {
    constructor(street, city, state, zip) {
        this._street = street;
        this._city = city;
        this._state = state;
        this._zip = zip;
        this.validate();
    }
    validate() {
        if (this._street.length === 0) {
            throw new Error("Street is required");
        }
        if (this._city.length === 0) {
            throw new Error("City is required");
        }
        if (this._state.length === 0) {
            throw new Error("State is required");
        }
        if (this._zip.length === 0) {
            throw new Error("Zip is required");
        }
    }
    toString() {
        return `${this._street}, ${this._city}, ${this._state}, ${this._zip}`;
    }
}
exports.default = Address;
