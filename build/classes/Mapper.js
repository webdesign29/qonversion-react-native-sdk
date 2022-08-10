"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const enums_1 = require("../enums");
const ExperimentGroup_1 = __importDefault(require("./ExperimentGroup"));
const ExperimentInfo_1 = __importDefault(require("./ExperimentInfo"));
const IntroEligibility_1 = __importDefault(require("./IntroEligibility"));
const LaunchResult_1 = __importDefault(require("./LaunchResult"));
const Offering_1 = __importDefault(require("./Offering"));
const Offerings_1 = __importDefault(require("./Offerings"));
const Permission_1 = __importDefault(require("./Permission"));
const Product_1 = __importDefault(require("./Product"));
const SKProduct_1 = __importDefault(require("./storeProducts/SKProduct"));
const SKProductDiscount_1 = __importDefault(require("./storeProducts/SKProductDiscount"));
const SKSubscriptionPeriod_1 = __importDefault(require("./storeProducts/SKSubscriptionPeriod"));
const SkuDetails_1 = __importDefault(require("./storeProducts/SkuDetails"));
const ActionResult_1 = __importDefault(require("./ActionResult"));
const QonversionError_1 = __importDefault(require("./QonversionError"));
const AutomationsEvent_1 = __importDefault(require("./AutomationsEvent"));
const skuDetailsPriceRatio = 1000000;
class Mapper {
    static convertLaunchResult(launchResult) {
        const products = this.convertProducts(launchResult.products);
        const permissions = this.convertPermissions(launchResult.permissions);
        const userProducts = this.convertProducts(launchResult.user_products);
        return new LaunchResult_1.default(launchResult.uid, launchResult.timestamp, products, permissions, userProducts);
    }
    static convertPermissions(permissions) {
        let mappedPermissions = new Map();
        for (const [key, permission] of Object.entries(permissions)) {
            let renewState = enums_1.RenewState.UNKNOWN;
            switch (permission.renew_state) {
                case -1:
                    renewState = enums_1.RenewState.NON_RENEWABLE;
                    break;
                case 1:
                    renewState = enums_1.RenewState.WILL_RENEW;
                    break;
                case 2:
                    renewState = enums_1.RenewState.CANCELED;
                    break;
                case 3:
                    renewState = enums_1.RenewState.BILLING_ISSUE;
                    break;
            }
            const mappedPermission = new Permission_1.default(permission.id, permission.associated_product, !!permission.active, renewState, permission.started_timestamp, permission.expiration_timestamp);
            mappedPermissions.set(key, mappedPermission);
        }
        return mappedPermissions;
    }
    static convertProducts(products) {
        let mappedProducts = new Map();
        for (const [key, product] of Object.entries(products)) {
            const mappedProduct = this.convertProduct(product);
            mappedProducts.set(key, mappedProduct);
        }
        return mappedProducts;
    }
    static convertProduct(product) {
        const productType = enums_1.ProductType[product.type];
        const productDuration = enums_1.ProductDuration[product.duration];
        const trialDuration = enums_1.TrialDuration[product.trialDuration];
        const offeringId = product.offeringId;
        let skProduct = null;
        let skuDetails = null;
        let price;
        let currencyCode;
        let storeTitle;
        let storeDescription;
        let prettyIntroductoryPrice;
        if (product.storeProduct != null) {
            if (react_native_1.Platform.OS === "ios") {
                skProduct = Mapper.convertSKProduct(product.storeProduct);
                price = parseFloat(skProduct.price);
                currencyCode = skProduct.currencyCode;
                storeTitle = skProduct.localizedTitle;
                storeDescription = skProduct.localizedDescription;
                if (skProduct.productDiscount) {
                    prettyIntroductoryPrice = skProduct.productDiscount.currencySymbol + skProduct.productDiscount.price;
                }
            }
            else {
                skuDetails = Mapper.convertSkuDetails(product.storeProduct);
                price = skuDetails.priceAmountMicros / skuDetailsPriceRatio;
                currencyCode = skuDetails.priceCurrencyCode;
                storeTitle = skuDetails.title;
                storeDescription = skuDetails.description;
                if (skuDetails.introductoryPrice.length > 0) {
                    prettyIntroductoryPrice = skuDetails.introductoryPrice;
                }
            }
        }
        const mappedProduct = new Product_1.default(product.id, product.store_id, productType, productDuration, skuDetails, skProduct, product.prettyPrice, trialDuration, price, currencyCode, storeTitle, storeDescription, prettyIntroductoryPrice, offeringId);
        return mappedProduct;
    }
    static convertOfferings(offerings) {
        if (!Array.isArray(offerings.availableOfferings) ||
            offerings.availableOfferings.length === 0) {
            return null;
        }
        let mainOffering = null;
        if (offerings.main) {
            mainOffering = this.convertOffering(offerings.main);
        }
        const availableOfferings = [];
        offerings.availableOfferings.forEach((offering) => {
            const mappedOffering = this.convertOffering(offering);
            availableOfferings.push(mappedOffering);
        });
        return new Offerings_1.default(mainOffering, availableOfferings);
    }
    static convertOffering(offering) {
        const products = [];
        offering.products.forEach((product) => {
            const mappedProduct = this.convertProduct(product);
            products.push(mappedProduct);
        });
        const tag = enums_1.OfferingTag[offering.tag] ?? enums_1.OfferingTag[0];
        return new Offering_1.default(offering.id, tag, products);
    }
    static convertSkuDetails(skuDetails) {
        return new SkuDetails_1.default(skuDetails.description, skuDetails.freeTrialPeriod, skuDetails.iconUrl, skuDetails.introductoryPrice, skuDetails.introductoryPriceAmountMicros, skuDetails.introductoryPriceCycles, skuDetails.introductoryPricePeriod, skuDetails.originalJson, skuDetails.originalPrice, skuDetails.originalPriceAmountMicros, skuDetails.price, skuDetails.priceAmountMicros, skuDetails.priceCurrencyCode, skuDetails.sku, skuDetails.subscriptionPeriod, skuDetails.title, skuDetails.type, skuDetails.hashCode, skuDetails.toString);
    }
    static convertSKProduct(skProduct) {
        let subscriptionPeriod;
        if (skProduct.subscriptionPeriod != null) {
            subscriptionPeriod = this.convertSubscriptionPeriod(skProduct.subscriptionPeriod);
        }
        let discount;
        if (skProduct.introductoryPrice) {
            discount = this.convertProductDiscount(skProduct.introductoryPrice);
        }
        let discounts;
        if (Array.isArray(skProduct.discounts) && skProduct.discounts.length) {
            discounts = this.convertDiscounts(skProduct.discounts);
        }
        return new SKProduct_1.default(skProduct.localizedDescription, skProduct.localizedTitle, skProduct.price, skProduct.localeIdentifier, skProduct.productIdentifier, !!skProduct.isDownloadable, skProduct.downloadContentVersion, skProduct.downloadContentLengths, subscriptionPeriod, discount, discounts, skProduct.subscriptionGroupIdentifier, skProduct.isFamilyShareable, skProduct.currencyCode);
    }
    static convertSubscriptionPeriod(subscriptionPeriod) {
        return new SKSubscriptionPeriod_1.default(subscriptionPeriod.numberOfUnits, enums_1.SKPeriodUnit[subscriptionPeriod.unit]);
    }
    static convertProductDiscount(discount) {
        let subscriptionPeriod = undefined;
        if (discount.subscriptionPeriod != null) {
            subscriptionPeriod = this.convertSubscriptionPeriod(discount.subscriptionPeriod);
        }
        return new SKProductDiscount_1.default(discount.price, discount.localeIdentifier, discount.numberOfPeriods, subscriptionPeriod, enums_1.SKProductDiscountPaymentMode[discount.paymentMode], discount.identifier, enums_1.SKProductDiscountType[discount.type], discount.currencySymbol);
    }
    static convertDiscounts(discounts) {
        const mappedDiscounts = discounts.map((discount) => {
            return this.convertProductDiscount(discount);
        });
        return mappedDiscounts;
    }
    static convertEligibility(eligibilityInfo) {
        let mappedEligibility = new Map();
        for (const info of eligibilityInfo) {
            const productId = info.productId;
            const status = Mapper.convertEligibilityStatus(info.status);
            const eligibilityInfo = new IntroEligibility_1.default(status);
            mappedEligibility.set(productId, eligibilityInfo);
        }
        return mappedEligibility;
    }
    static convertEligibilityStatus(status) {
        switch (status) {
            case "non_intro_or_trial_product":
                return enums_1.IntroEligibilityStatus.NON_INTRO_OR_TRIAL_PRODUCT;
            case "intro_or_trial_eligible":
                return enums_1.IntroEligibilityStatus.ELIGIBLE;
            case "intro_or_trial_ineligible":
                return enums_1.IntroEligibilityStatus.INELIGIBLE;
            default:
                return enums_1.IntroEligibilityStatus.UNKNOWN;
        }
    }
    static convertExperimentInfo(experimentInfo) {
        const mappedExperimentInfo = new Map();
        for (const info of experimentInfo) {
            const groupType = info.group.type === 1
                ? enums_1.ExperimentGroupType.GROUP_TYPE_B
                : enums_1.ExperimentGroupType.GROUP_TYPE_A;
            const group = new ExperimentGroup_1.default(groupType);
            const experiment = new ExperimentInfo_1.default(info.id, group);
            mappedExperimentInfo.set(experiment.identifier, experiment);
        }
        return mappedExperimentInfo;
    }
    static convertActionResult(actionResult) {
        return new ActionResult_1.default(actionResult.type, actionResult.value, this.convertQonversionError(actionResult.error));
    }
    static convertQonversionError(error) {
        return error ? new QonversionError_1.default(error.code, error.description, error.additionalMessage) : undefined;
    }
    static convertAutomationsEvent(automationsEvent) {
        return new AutomationsEvent_1.default(automationsEvent.type, automationsEvent.timestamp);
    }
}
exports.default = Mapper;
//# sourceMappingURL=Mapper.js.map