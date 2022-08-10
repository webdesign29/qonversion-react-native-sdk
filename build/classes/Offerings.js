"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Offerings {
    constructor(main, availableOfferings) {
        this.main = main;
        this.availableOffering = availableOfferings;
    }
    offeringForIdentifier(identifier) {
        return this.availableOffering.find((object) => object.id === identifier);
    }
}
exports.default = Offerings;
//# sourceMappingURL=Offerings.js.map