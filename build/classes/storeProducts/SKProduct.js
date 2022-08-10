"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SKProduct {
    constructor(localizedDescription, localizedTitle, price, localeIdentifier, productIdentifier, isDownloadable, downloadContentVersion, downloadContentLengths, subscriptionPeriod, productDiscount, discounts, subscriptionGroupIdentifier, isFamilyShareable, currencyCode) {
        this.localizedDescription = localizedDescription;
        this.localizedTitle = localizedTitle;
        this.price = price;
        this.localeIdentifier = localeIdentifier;
        this.productIdentifier = productIdentifier;
        this.isDownloadable = isDownloadable;
        this.downloadContentVersion = downloadContentVersion;
        this.downloadContentLengths = downloadContentLengths;
        this.subscriptionPeriod = subscriptionPeriod;
        this.productDiscount = productDiscount;
        this.discounts = discounts;
        this.subscriptionGroupIdentifier = subscriptionGroupIdentifier;
        this.isFamilyShareable = isFamilyShareable;
        this.currencyCode = currencyCode;
    }
}
exports.default = SKProduct;
//# sourceMappingURL=SKProduct.js.map