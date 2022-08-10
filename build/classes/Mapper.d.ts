import { ActionResultType, AutomationsEventType, IntroEligibilityStatus, OfferingTag, ProductDuration, ProductType, SKPeriodUnit, SKProductDiscountPaymentMode, SKProductDiscountType, TrialDuration } from "../enums";
import ExperimentInfo from "./ExperimentInfo";
import IntroEligibility from "./IntroEligibility";
import LaunchResult from "./LaunchResult";
import Offering from "./Offering";
import Offerings from "./Offerings";
import Permission from "./Permission";
import Product from "./Product";
import SKProduct from "./storeProducts/SKProduct";
import SKProductDiscount from "./storeProducts/SKProductDiscount";
import SKSubscriptionPeriod from "./storeProducts/SKSubscriptionPeriod";
import SkuDetails from "./storeProducts/SkuDetails";
import ActionResult from "./ActionResult";
import QonversionError from "./QonversionError";
import AutomationsEvent from "./AutomationsEvent";
declare type QLaunchResult = {
    products: Array<QProduct>;
    user_products: Array<QProduct>;
    permissions: Array<QPermission>;
    uid: string;
    timestamp: number;
};
declare type QProduct = {
    type: keyof typeof ProductType;
    duration: keyof typeof ProductDuration;
    trialDuration: keyof typeof TrialDuration;
    id: string;
    store_id: string;
    prettyPrice?: string;
    storeProduct: null | QSkuDetails | QSKProduct;
    offeringId: string | null;
};
declare type QSkuDetails = {
    description: string;
    freeTrialPeriod: string;
    iconUrl: string;
    introductoryPrice: string;
    introductoryPriceAmountMicros: number;
    introductoryPriceCycles: number;
    introductoryPricePeriod: string;
    originalJson: string;
    originalPrice: string;
    originalPriceAmountMicros: number;
    price: string;
    priceAmountMicros: number;
    priceCurrencyCode: string;
    sku: string;
    subscriptionPeriod: string;
    title: string;
    type: string;
    hashCode: number;
    toString: string;
};
declare type QSKProduct = {
    subscriptionPeriod: null | QSubscriptionPeriod;
    introductoryPrice: QProductDiscount | null;
    discounts: Array<QProductDiscount> | null;
    localizedDescription: string | undefined;
    localizedTitle: string | undefined;
    price: string;
    localeIdentifier: string | undefined;
    productIdentifier: string | undefined;
    isDownloadable: boolean;
    downloadContentVersion: string | undefined;
    downloadContentLengths: number[] | undefined;
    productDiscount: SKProductDiscount | undefined;
    subscriptionGroupIdentifier: string | undefined;
    isFamilyShareable: boolean | undefined;
    currencyCode: string;
};
declare type QSubscriptionPeriod = {
    numberOfUnits: number;
    unit: keyof typeof SKPeriodUnit;
};
declare type QProductDiscount = {
    subscriptionPeriod: null | QSubscriptionPeriod;
    price: string;
    localeIdentifier?: string;
    numberOfPeriods: number;
    paymentMode: keyof typeof SKProductDiscountPaymentMode;
    identifier?: string;
    type: keyof typeof SKProductDiscountType;
    currencySymbol: string;
};
declare type QPermission = {
    id: string;
    associated_product: string;
    active: boolean;
    renew_state: number;
    started_timestamp: number;
    expiration_timestamp: number;
};
declare type QOfferings = {
    availableOfferings?: Array<QOffering>;
    main: QOffering;
};
declare type QOffering = {
    id: string;
    tag: keyof typeof OfferingTag;
    products: Array<QProduct>;
};
declare type QActionResult = {
    type: ActionResultType;
    value: Map<string, string | undefined> | undefined;
    error: QError | undefined;
};
declare type QError = {
    code: string;
    description: string;
    additionalMessage: string;
};
declare type QAutomationsEvent = {
    type: AutomationsEventType;
    timestamp: number;
};
declare class Mapper {
    static convertLaunchResult(launchResult: QLaunchResult): LaunchResult;
    static convertPermissions(permissions: Array<QPermission>): Map<string, Permission>;
    static convertProducts(products: Array<QProduct>): Map<string, Product>;
    static convertProduct(product: QProduct): Product;
    static convertOfferings(offerings: QOfferings): Offerings | null;
    static convertOffering(offering: QOffering): Offering;
    static convertSkuDetails(skuDetails: QSkuDetails): SkuDetails;
    static convertSKProduct(skProduct: QSKProduct): SKProduct;
    static convertSubscriptionPeriod(subscriptionPeriod: QSubscriptionPeriod): SKSubscriptionPeriod;
    static convertProductDiscount(discount: QProductDiscount): SKProductDiscount;
    static convertDiscounts(discounts: Array<QProductDiscount>): SKProductDiscount[];
    static convertEligibility(eligibilityInfo: Array<{
        productId: string;
        status: "non_intro_or_trial_product" | "intro_or_trial_eligible" | "intro_or_trial_ineligible";
    }>): Map<string, IntroEligibility>;
    static convertEligibilityStatus(status: string): IntroEligibilityStatus;
    static convertExperimentInfo(experimentInfo: Array<{
        id: string;
        group: {
            type: number;
        };
    }>): Map<string, ExperimentInfo>;
    static convertActionResult(actionResult: QActionResult): ActionResult;
    static convertQonversionError(error: QError | undefined): QonversionError | undefined;
    static convertAutomationsEvent(automationsEvent: QAutomationsEvent): AutomationsEvent;
}
export default Mapper;
