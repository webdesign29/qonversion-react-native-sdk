"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Permission {
    constructor(permissionID, productID, isActive, renewState, startedDate, expirationDate) {
        this.permissionID = permissionID;
        this.productID = productID;
        this.isActive = isActive;
        this.renewState = renewState;
        this.startedDate = startedDate;
        this.expirationDate = expirationDate;
    }
}
exports.default = Permission;
//# sourceMappingURL=Permission.js.map