export declare const ProductType: {
    readonly "0": "TRIAL";
    readonly "1": "DIRECT_SUBSCRIPTION";
    readonly "2": "ONE_TIME";
};
export declare type ProductTypes = typeof ProductType[keyof typeof ProductType];
export declare const ProductDuration: {
    readonly 0: "WEEKLY";
    readonly 1: "MONTHLY";
    readonly 2: "3_MONTHS";
    readonly 3: "6_MONTHS";
    readonly 4: "ANNUAL";
    readonly 5: "LIFETIME";
};
export declare type ProductDurations = typeof ProductDuration[keyof typeof ProductDuration];
export declare const TrialDuration: {
    readonly "-1": "NOT_AVAILABLE";
    readonly "1": "THREE_DAYS";
    readonly "2": "WEEK";
    readonly "3": "TWO_WEEKS";
    readonly "4": "MONTH";
    readonly "5": "TWO_MONTHS";
    readonly "6": "THREE_MONTHS";
    readonly "7": "SIX_MONTHS";
    readonly "8": "YEAR";
    readonly "9": "OTHER";
};
export declare type TrialDurations = typeof TrialDuration[keyof typeof TrialDuration];
export declare enum RenewState {
    NON_RENEWABLE = -1,
    UNKNOWN = 0,
    WILL_RENEW = 1,
    CANCELED = 2,
    BILLING_ISSUE = 3
}
export declare enum Property {
    EMAIL = 0,
    NAME = 1,
    APPS_FLYER_USER_ID = 2,
    ADJUST_USER_ID = 3,
    KOCHAVA_DEVICE_ID = 4,
    CUSTOM_USER_ID = 5,
    FACEBOOK_ATTRIBUTION = 6,
    ADVERTISING_ID = 7
}
export declare enum Provider {
    APPSFLYER = 0,
    BRANCH = 1,
    ADJUST = 2,
    APPLE = 3
}
export declare enum ProrationMode {
    UNKNOWN_SUBSCRIPTION_UPGRADE_DOWNGRADE_POLICY = 0,
    IMMEDIATE_WITH_TIME_PRORATION = 1,
    IMMEDIATE_AND_CHARGE_PRORATED_PRICE = 2,
    IMMEDIATE_WITHOUT_PRORATION = 3,
    DEFERRED = 4
}
export declare const SKPeriodUnit: {
    readonly 0: "DAY";
    readonly 1: "WEEK";
    readonly 2: "MONTH";
    readonly 3: "YEAR";
};
export declare type SKPeriodUnits = typeof SKPeriodUnit[keyof typeof SKPeriodUnit];
export declare const SKProductDiscountType: {
    readonly 0: "INTRODUCTORY";
    readonly 1: "SUBSCRIPTION";
};
export declare type SKProductDiscountTypes = typeof SKProductDiscountType[keyof typeof SKProductDiscountType];
export declare const SKProductDiscountPaymentMode: {
    readonly 0: "PAY_AS_YOU_GO";
    readonly 1: "PAY_UP_FRONT";
    readonly 2: "FREE_TRIAL";
};
export declare type SKProductDiscountPaymentModes = typeof SKProductDiscountPaymentMode[keyof typeof SKProductDiscountPaymentMode];
export declare const OfferingTag: {
    readonly 0: "NONE";
    readonly 1: "MAIN";
};
export declare type OfferingTags = typeof OfferingTag[keyof typeof OfferingTag];
export declare enum IntroEligibilityStatus {
    UNKNOWN = "unknown",
    NON_INTRO_OR_TRIAL_PRODUCT = "non_intro_or_trial_product",
    ELIGIBLE = "intro_or_trial_eligible",
    INELIGIBLE = "intro_or_trial_ineligible"
}
export declare enum ExperimentGroupType {
    GROUP_TYPE_A = 0,
    GROUP_TYPE_B = 1
}
export declare enum ActionResultType {
    UNKNOWN = "unknown",
    URL = "url",
    DEEPLINK = "deeplink",
    NAVIGATION = "navigate",
    PURCHASE = "purchase",
    RESTORE = "restore",
    CLOSE = "close"
}
export declare enum AutomationsEventType {
    UNKNOWN = "unknown",
    TRIAL_STARTED = "trial_started",
    TRIAL_CONVERTED = "trial_converted",
    TRIAL_CANCELED = "trial_canceled",
    TRIAL_BILLING_RETRY = "trial_billing_retry_entered",
    SUBSCRIPTION_STARTED = "subscription_started",
    SUBSCRIPTION_RENEWED = "subscription_renewed",
    SUBSCRIPTION_REFUNDED = "subscription_refunded",
    SUBSCRIPTION_CANCELED = "subscription_canceled",
    SUBSCRIPTION_BILLING_RETRY = "subscription_billing_retry_entered",
    IN_APP_PURCHASE = "in_app_purchase",
    SUBSCRIPTION_UPGRADED = "subscription_upgraded",
    TRIAL_STILL_ACTIVE = "trial_still_active",
    TRIAL_EXPIRED = "trial_expired",
    SUBSCRIPTION_EXPIRED = "subscription_expired",
    SUBSCRIPTION_DOWNGRADED = "subscription_downgraded",
    SUBSCRIPTION_PRODUCT_CHANGED = "subscription_product_changed"
}
