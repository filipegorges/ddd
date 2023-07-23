import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => new Product("", "1", 10)).toThrowError("ID is required");
    });
    it("should throw error when name is empty", () => {
        expect(() => new Product("1", "", 10)).toThrowError("Name is required");
    });
    it("should throw error when price is less than 0", () => {
        expect(() => new Product("1", "1", -1)).toThrowError("Price must be greater than zero");
    });
    it("should change name", () => {
        let product = new Product("1", "1", 10);
        product.changeName("2");
        expect(product.name).toBe("2");
    });
    it("should change price", () => {
        let product = new Product("1", "1", 10);
        product.changePrice(20);
        expect(product.price).toBe(20);
    });
});