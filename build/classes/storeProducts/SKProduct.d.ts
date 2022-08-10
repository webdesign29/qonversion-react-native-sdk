import SKProductDiscount from "./SKProductDiscount";
import SKSubscriptionPeriod from "./SKSubscriptionPeriod";
declare class SKProduct {
    localizedDescription?: string;
    localizedTitle?: string;
    price: string;
    localeIdentifier?: string;
    productIdentifier?: string;
    isDownloadable: boolean;
    downloadContentVersion?: string;
    downloadContentLengths?: Array<number>;
    subscriptionPeriod?: SKSubscriptionPeriod;
    productDiscount?: SKProductDiscount;
    discounts?: Array<SKProductDiscount>;
    subscriptionGroupIdentifier?: string;
    isFamilyShareable?: boolean;
    currencyCode: string;
    constructor(localizedDescription: string | undefined, localizedTitle: string | undefined, price: string, localeIdentifier: string | undefined, productIdentifier: string | undefined, isDownloadable: boolean, downloadContentVersion: string | undefined, downloadContentLengths: number[] | undefined, subscriptionPeriod: SKSubscriptionPeriod | undefined, productDiscount: SKProductDiscount | undefined, discounts: SKProductDiscount[] | undefined, subscriptionGroupIdentifier: string | undefined, isFamilyShareable: boolean | undefined, currencyCode: string);
}
export default SKProduct;
