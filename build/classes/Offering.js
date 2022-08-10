"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Offering {
    constructor(id, tag, products) {
        this.id = id;
        this.tag = tag;
        this.products = products;
    }
    productForIdentifier(identifier) {
        return this.products.find((object) => object.qonversionID === identifier);
    }
}
exports.default = Offering;
//# sourceMappingURL=Offering.js.map