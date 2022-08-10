"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationsEventType = exports.ActionResultType = exports.ExperimentGroupType = exports.IntroEligibilityStatus = exports.OfferingTag = exports.SKProductDiscountPaymentMode = exports.SKProductDiscountType = exports.SKPeriodUnit = exports.ProrationMode = exports.Provider = exports.Property = exports.RenewState = exports.TrialDuration = exports.ProductDuration = exports.ProductType = void 0;
exports.ProductType = {
    "0": "TRIAL",
    "1": "DIRECT_SUBSCRIPTION",
    "2": "ONE_TIME",
};
exports.ProductDuration = {
    0: "WEEKLY",
    1: "MONTHLY",
    2: "3_MONTHS",
    3: "6_MONTHS",
    4: "ANNUAL",
    5: "LIFETIME",
};
exports.TrialDuration = {
    "-1": "NOT_AVAILABLE",
    "1": "THREE_DAYS",
    "2": "WEEK",
    "3": "TWO_WEEKS",
    "4": "MONTH",
    "5": "TWO_MONTHS",
    "6": "THREE_MONTHS",
    "7": "SIX_MONTHS",
    "8": "YEAR",
    "9": "OTHER",
};
var RenewState;
(function (RenewState) {
    RenewState[RenewState["NON_RENEWABLE"] = -1] = "NON_RENEWABLE";
    RenewState[RenewState["UNKNOWN"] = 0] = "UNKNOWN";
    RenewState[RenewState["WILL_RENEW"] = 1] = "WILL_RENEW";
    RenewState[RenewState["CANCELED"] = 2] = "CANCELED";
    RenewState[RenewState["BILLING_ISSUE"] = 3] = "BILLING_ISSUE";
})(RenewState = exports.RenewState || (exports.RenewState = {}));
var Property;
(function (Property) {
    Property[Property["EMAIL"] = 0] = "EMAIL";
    Property[Property["NAME"] = 1] = "NAME";
    Property[Property["APPS_FLYER_USER_ID"] = 2] = "APPS_FLYER_USER_ID";
    Property[Property["ADJUST_USER_ID"] = 3] = "ADJUST_USER_ID";
    Property[Property["KOCHAVA_DEVICE_ID"] = 4] = "KOCHAVA_DEVICE_ID";
    Property[Property["CUSTOM_USER_ID"] = 5] = "CUSTOM_USER_ID";
    Property[Property["FACEBOOK_ATTRIBUTION"] = 6] = "FACEBOOK_ATTRIBUTION";
    Property[Property["ADVERTISING_ID"] = 7] = "ADVERTISING_ID";
})(Property = exports.Property || (exports.Property = {}));
var Provider;
(function (Provider) {
    Provider[Provider["APPSFLYER"] = 0] = "APPSFLYER";
    Provider[Provider["BRANCH"] = 1] = "BRANCH";
    Provider[Provider["ADJUST"] = 2] = "ADJUST";
    Provider[Provider["APPLE"] = 3] = "APPLE";
})(Provider = exports.Provider || (exports.Provider = {}));
var ProrationMode;
(function (ProrationMode) {
    ProrationMode[ProrationMode["UNKNOWN_SUBSCRIPTION_UPGRADE_DOWNGRADE_POLICY"] = 0] = "UNKNOWN_SUBSCRIPTION_UPGRADE_DOWNGRADE_POLICY";
    ProrationMode[ProrationMode["IMMEDIATE_WITH_TIME_PRORATION"] = 1] = "IMMEDIATE_WITH_TIME_PRORATION";
    ProrationMode[ProrationMode["IMMEDIATE_AND_CHARGE_PRORATED_PRICE"] = 2] = "IMMEDIATE_AND_CHARGE_PRORATED_PRICE";
    ProrationMode[ProrationMode["IMMEDIATE_WITHOUT_PRORATION"] = 3] = "IMMEDIATE_WITHOUT_PRORATION";
    ProrationMode[ProrationMode["DEFERRED"] = 4] = "DEFERRED";
})(ProrationMode = exports.ProrationMode || (exports.ProrationMode = {}));
exports.SKPeriodUnit = {
    0: "DAY",
    1: "WEEK",
    2: "MONTH",
    3: "YEAR",
};
exports.SKProductDiscountType = {
    0: "INTRODUCTORY",
    1: "SUBSCRIPTION",
};
exports.SKProductDiscountPaymentMode = {
    0: "PAY_AS_YOU_GO",
    1: "PAY_UP_FRONT",
    2: "FREE_TRIAL",
};
exports.OfferingTag = {
    0: "NONE",
    1: "MAIN",
};
var IntroEligibilityStatus;
(function (IntroEligibilityStatus) {
    IntroEligibilityStatus["UNKNOWN"] = "unknown";
    IntroEligibilityStatus["NON_INTRO_OR_TRIAL_PRODUCT"] = "non_intro_or_trial_product";
    IntroEligibilityStatus["ELIGIBLE"] = "intro_or_trial_eligible";
    IntroEligibilityStatus["INELIGIBLE"] = "intro_or_trial_ineligible";
})(IntroEligibilityStatus = exports.IntroEligibilityStatus || (exports.IntroEligibilityStatus = {}));
var ExperimentGroupType;
(function (ExperimentGroupType) {
    ExperimentGroupType[ExperimentGroupType["GROUP_TYPE_A"] = 0] = "GROUP_TYPE_A";
    ExperimentGroupType[ExperimentGroupType["GROUP_TYPE_B"] = 1] = "GROUP_TYPE_B";
})(ExperimentGroupType = exports.ExperimentGroupType || (exports.ExperimentGroupType = {}));
var ActionResultType;
(function (ActionResultType) {
    ActionResultType["UNKNOWN"] = "unknown";
    ActionResultType["URL"] = "url";
    ActionResultType["DEEPLINK"] = "deeplink";
    ActionResultType["NAVIGATION"] = "navigate";
    ActionResultType["PURCHASE"] = "purchase";
    ActionResultType["RESTORE"] = "restore";
    ActionResultType["CLOSE"] = "close";
})(ActionResultType = exports.ActionResultType || (exports.ActionResultType = {}));
var AutomationsEventType;
(function (AutomationsEventType) {
    AutomationsEventType["UNKNOWN"] = "unknown";
    AutomationsEventType["TRIAL_STARTED"] = "trial_started";
    AutomationsEventType["TRIAL_CONVERTED"] = "trial_converted";
    AutomationsEventType["TRIAL_CANCELED"] = "trial_canceled";
    AutomationsEventType["TRIAL_BILLING_RETRY"] = "trial_billing_retry_entered";
    AutomationsEventType["SUBSCRIPTION_STARTED"] = "subscription_started";
    AutomationsEventType["SUBSCRIPTION_RENEWED"] = "subscription_renewed";
    AutomationsEventType["SUBSCRIPTION_REFUNDED"] = "subscription_refunded";
    AutomationsEventType["SUBSCRIPTION_CANCELED"] = "subscription_canceled";
    AutomationsEventType["SUBSCRIPTION_BILLING_RETRY"] = "subscription_billing_retry_entered";
    AutomationsEventType["IN_APP_PURCHASE"] = "in_app_purchase";
    AutomationsEventType["SUBSCRIPTION_UPGRADED"] = "subscription_upgraded";
    AutomationsEventType["TRIAL_STILL_ACTIVE"] = "trial_still_active";
    AutomationsEventType["TRIAL_EXPIRED"] = "trial_expired";
    AutomationsEventType["SUBSCRIPTION_EXPIRED"] = "subscription_expired";
    AutomationsEventType["SUBSCRIPTION_DOWNGRADED"] = "subscription_downgraded";
    AutomationsEventType["SUBSCRIPTION_PRODUCT_CHANGED"] = "subscription_product_changed";
})(AutomationsEventType = exports.AutomationsEventType || (exports.AutomationsEventType = {}));
//# sourceMappingURL=enums.js.map