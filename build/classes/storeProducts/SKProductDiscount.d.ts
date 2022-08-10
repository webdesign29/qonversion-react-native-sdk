import { SKProductDiscountPaymentModes, SKProductDiscountTypes } from "../../enums";
import SKSubscriptionPeriod from "./SKSubscriptionPeriod";
declare class SKProductDiscount {
    price: string;
    localeIdentifier?: string;
    numberOfPeriods: number;
    subscriptionPeriod?: SKSubscriptionPeriod;
    paymentMode: SKProductDiscountPaymentModes;
    identifier?: string;
    type: SKProductDiscountTypes;
    currencySymbol: string;
    constructor(price: string, localeIdentifier: string | undefined, numberOfPeriods: number, subscriptionPeriod: SKSubscriptionPeriod | undefined, paymentMode: SKProductDiscountPaymentModes, identifier: string | undefined, type: SKProductDiscountTypes, currencySymbol: string);
}
export default SKProductDiscount;
