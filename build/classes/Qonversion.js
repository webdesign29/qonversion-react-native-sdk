"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const enums_1 = require("../enums");
const Mapper_1 = __importDefault(require("./Mapper"));
const utils_1 = require("../utils");
const { RNQonversion } = react_native_1.NativeModules;
const keyPrefix = "com.qonversion.keys";
const sourceKey = keyPrefix + ".source";
const versionKey = keyPrefix + ".sourceVersion";
const sdkVersion = "3.3.2";
const EVENT_PERMISSIONS_UPDATED = "permissions_updated";
const EVENT_PROMO_PURCHASE_RECEIVED = "promo_purchase_received";
class Qonversion {
    /**
     * Initializes Qonversion SDK with the given API ${@link key}.
     * You can get one in your account on https://dash.qonversion.io.
     *
     * @param key project key to setup the SDK.
     * @param observerMode set true if you are using observer mode only.
     * @returns the promise with the launch result.
     *
     * @see [Observer mode](https://documentation.qonversion.io/docs/how-qonversion-works)
     * @see [Installing the Android SDK](https://qonversion.io/docs/google)
     */
    static async launchWithKey(key, observerMode = false) {
        RNQonversion.storeSDKInfo(sourceKey, "rn", versionKey, sdkVersion);
        const response = await RNQonversion.launchWithKey(key, observerMode);
        const launchResult = Mapper_1.default.convertLaunchResult(response);
        return launchResult;
    }
    /**
     * Call this function to link a user to his unique ID in your system and share purchase data.
     *
     * @param userID unique user ID in your system.
     */
    static identify(userID) {
        RNQonversion.identify(userID);
    }
    /**
     * Call this function to unlink a user from his unique ID in your system and his purchase data.
     */
    static logout() {
        RNQonversion.logout();
    }
    /**
     * Sets user property for pre-defined case {@link property}.
     *
     * User properties are attributes you can set on a user level.
     * You can send user properties to third party platforms as well as use them in Qonversion for customer segmentation
     * and analytics.
     *
     * @param property defined enum key that will be transformed to string.
     * @param value property value.
     *
     * @see [documentation](https://documentation.qonversion.io/docs/user-properties)
     */
    static setProperty(property, value) {
        const key = utils_1.convertPropertyToNativeKey(property);
        if (key) {
            RNQonversion.setProperty(key, value);
        }
    }
    /**
     * Adds custom user {@link property}.
     *
     * User properties are attributes you can set on a user level.
     * You can send user properties to third party platforms as well as use them in Qonversion for customer segmentation
     * and analytics.
     *
     * @param property custom user property key.
     * @param value property value.
     *
     * @see [documentation](https://documentation.qonversion.io/docs/user-properties)
     */
    static setUserProperty(property, value) {
        RNQonversion.setUserProperty(property, value);
    }
    /**
     * Qonversion SDK provides an asynchronous method to set your side User ID that can be used to match users in
     * third-party integrations.
     *
     * @param userId your database user ID.
     *
     * @see [documentation](https://documentation.qonversion.io/docs/user-identifiers)
     *
     * @deprecated Will be removed in a future major release. Use {@link setProperty} with {@link Property.CUSTOM_USER_ID}
     * instead
     */
    static setUserId(userId) {
        this.setProperty(enums_1.Property.CUSTOM_USER_ID, userId);
    }
    /**
     * Sends your attribution {@link data} to the {@link provider}.
     *
     * @param data an object containing your attribution data.
     * @param provider the provider to which the data will be sent.
     */
    static addAttributionData(data, provider) {
        RNQonversion.addAttributionData(data, provider);
    }
    /**
     * You need to call the checkPermissions method at the start of your app to check if a user has the required
     * permission.
     *
     * This method will check the user receipt and will return the current permissions.
     *
     * @returns the promise with the permissions.
     *
     * If Apple or Google servers are not responding at the time of the request, Qonversion provides the latest
     * permissions data from its database.
     */
    static async checkPermissions() {
        const permissions = await RNQonversion.checkPermissions();
        const mappedPermissions = Mapper_1.default.convertPermissions(permissions);
        return mappedPermissions;
    }
    /**
     * Starts a process of purchasing a product with the specified identifier.
     *
     * @throws exception in case of error in purchase flow.
     * @param productId Qonversion product identifier for purchase.
     * @returns the promise with the user permissions including the ones obtained by the purchase.
     */
    static async purchase(productId) {
        return this.purchaseProxy(productId);
    }
    /**
     * Starts a process of purchasing product with Qonversion's {@link Product} object.
     *
     * @param product - Qonversion's {@link Product} object
     * @returns { Promise<Map<string, Permission>> } A map of available permissions
     */
    static async purchaseProduct(product) {
        return this.purchaseProxy(product.qonversionID, product.offeringId);
    }
    static async purchaseProxy(productId, offeringId = null) {
        try {
            const purchasePromise = !!offeringId ?
                RNQonversion.purchaseProduct(productId, offeringId)
                :
                    RNQonversion.purchase(productId);
            const permissions = await purchasePromise;
            const mappedPermissions = Mapper_1.default.convertPermissions(permissions);
            return mappedPermissions;
        }
        catch (e) {
            const iOSCancelCode = "1";
            const iOSCancelErrorDomain = "com.qonversion.io";
            const androidCancelCode = "CanceledPurchase";
            e.userCanceled =
                (utils_1.isIos() &&
                    e.domain === iOSCancelErrorDomain &&
                    e.code === iOSCancelCode) ||
                    (utils_1.isAndroid() && e.code === androidCancelCode);
            throw e;
        }
    }
    /**
     * Android only. Returns `null` if called on iOS.
     *
     * Upgrading, downgrading, or changing a subscription on Google Play Store requires calling updatePurchase() function.
     *
     * @param productId Qonversion product identifier for purchase.
     * @param oldProductId Qonversion product identifier from which the upgrade/downgrade will be initialized.
     * @param prorationMode proration mode.
     * @returns the promise with the user permissions including updated ones.
     *
     * @see [Google Play Documentation](https://developer.android.com/google/play/billing/subscriptions#upgrade-downgrade)
     * for more details.
     * @see [Proration mode](https://developer.android.com/google/play/billing/subscriptions#proration)
     * @see [Product Center](https://qonversion.io/docs/product-center)
     */
    static async updatePurchase(productId, oldProductId, prorationMode = null) {
        if (!utils_1.isAndroid()) {
            return null;
        }
        let permissions;
        if (prorationMode == null) {
            permissions = await RNQonversion.updatePurchase(productId, oldProductId);
        }
        else {
            permissions = await RNQonversion.updatePurchaseWithProrationMode(productId, oldProductId, prorationMode);
        }
        const mappedPermissions = Mapper_1.default.convertPermissions(permissions);
        return mappedPermissions;
    }
    /**
     * Android only. Returns `null` if called on iOS.
     *
     * Upgrading, downgrading, or changing a subscription on Google Play Store requires calling updatePurchase() function.
     *
     * @param product Qonversion product for purchase.
     * @param oldProductId Qonversion product identifier from which the upgrade/downgrade will be initialized.
     * @param prorationMode proration mode.
     * @returns the promise with the user permissions including updated ones.
     *
     * @see [Google Play Documentation](https://developer.android.com/google/play/billing/subscriptions#upgrade-downgrade)
     * for more details.
     * @see [Proration mode](https://developer.android.com/google/play/billing/subscriptions#proration)
     * @see [Product Center](https://qonversion.io/docs/product-center)
     */
    static async updatePurchaseWithProduct(product, oldProductId, prorationMode = null) {
        if (!utils_1.isAndroid()) {
            return null;
        }
        let permissions;
        if (prorationMode == null) {
            permissions = await RNQonversion.updateProductWithId(product.qonversionID, product.offeringId, oldProductId);
        }
        else {
            permissions = await RNQonversion.updateProductWithIdAndProrationMode(product.qonversionID, product.offeringId, oldProductId, prorationMode);
        }
        const mappedPermissions = Mapper_1.default.convertPermissions(permissions);
        return mappedPermissions;
    }
    /**
     * Returns Qonversion products in association with Apple and Google Play Store Products.
     *
     * @returns the promise with Qonversion products.
     *
     * @see [Product Center](https://qonversion.io/docs/product-center)
     */
    static async products() {
        let products = await RNQonversion.products();
        const mappedProducts = Mapper_1.default.convertProducts(products);
        return mappedProducts;
    }
    /**
     * Return Qonversion Offerings Object.
     *
     * An offering is a group of products that you can offer to a user on a given paywall based on your business logic.
     * For example, you can offer one set of products on a paywall immediately after onboarding and another
     * set of products with discounts later on if a user has not converted.
     * Offerings allow changing the products offered remotely without releasing app updates.
     *
     * @returns the promise with Qonversion offerings.
     *
     * @see [Offerings](https://qonversion.io/docs/offerings) for more details.
     * @see [Product Center](https://qonversion.io/docs/product-center) for more details.
     */
    static async offerings() {
        let offerings = await RNQonversion.offerings();
        const mappedOfferings = Mapper_1.default.convertOfferings(offerings);
        return mappedOfferings;
    }
    /**
     * Restoring purchases restores users purchases in your app, to maintain access to purchased content.
     * Users sometimes need to restore purchased content, such as when they upgrade to a new phone.
     *
     * @returns the promise with the user permissions.
     */
    static async restore() {
        const permissions = await RNQonversion.restore();
        const mappedPermissions = Mapper_1.default.convertPermissions(permissions);
        return mappedPermissions;
    }
    /**
     * You can check if a user is eligible for an introductory offer, including a free trial.
     * You can show only a regular price for users who are not eligible for an introductory offer.
     *
     * @param ids products identifiers that must be checked.
     * @returns the promise with eligibility map.
     */
    static async checkTrialIntroEligibilityForProductIds(ids) {
        const eligibilityInfo = await RNQonversion.checkTrialIntroEligibilityForProductIds(ids);
        const mappedEligibility = Mapper_1.default.convertEligibility(eligibilityInfo);
        return mappedEligibility;
    }
    static async experiments() {
        const experiments = await RNQonversion.experiments();
        const mappedExperiments = Mapper_1.default.convertExperimentInfo(experiments);
        return mappedExperiments;
    }
    /**
     * This method will send all purchases to the Qonversion backend. Call this every time when purchase is handled
     * by your own implementation.
     *
     * **Warning!**
     *
     * This method works for Android only.
     * It should only be called if you're using Qonversion SDK in observer mode.
     *
     * @see [Observer mode for Android SDK](https://documentation.qonversion.io/docs/observer-mode#android-sdk)
     */
    static syncPurchases() {
        if (!utils_1.isAndroid()) {
            return;
        }
        RNQonversion.syncPurchases();
    }
    /**
     * You can set the flag to distinguish sandbox and production users.
     * To see the sandbox users turn on the Viewing test Data toggle on Qonversion Dashboard
     */
    static setDebugMode() {
        RNQonversion.setDebugMode();
    }
    /**
     * Call this function to reset user ID and generate new anonymous user ID.
     * Call this function before Qonversion.launchWithKey()
     *
     * @deprecated This function was used in debug mode only. You can reinstall the app if you need to reset the user ID.
     */
    static resetUser() { }
    /**
     * iOS only. Returns `null` if called on Android.
     * On iOS 14.5+, after requesting the app tracking permission using ATT, you need to notify Qonversion if tracking
     * is allowed and IDFA is available.
     */
    static setAdvertisingID() {
        if (utils_1.isIos()) {
            RNQonversion.setAdvertisingID();
        }
    }
    /**
     * Enable attribution collection from Apple Search Ads. False by default.
     */
    static setAppleSearchAdsAttributionEnabled(enabled) {
        if (utils_1.isIos()) {
            RNQonversion.setAppleSearchAdsAttributionEnabled(enabled);
        }
    }
    /**
     * Set push token to Qonversion to enable Qonversion push notifications
     * @param token Firebase device token on Android. APNs device token on iOS.
     */
    static setNotificationsToken(token) {
        RNQonversion.setNotificationsToken(token);
    }
    /**
     * Call to handle push notifications sent by Qonversion Automation.
     * @param notificationData notification payload data
     * @return true when a push notification was received from Qonversion. Otherwise returns false, so you need to handle a notification yourself
     * @see [Firebase RemoteMessage data](https://pub.dev/documentation/firebase_messaging_platform_interface/latest/firebase_messaging_platform_interface/RemoteMessage/data.html)
     * @see [APNs notification data](https://developer.apple.com/documentation/usernotifications/unnotificationcontent/1649869-userinfo)
     */
    static async handleNotification(notificationData) {
        try {
            return await RNQonversion.handleNotification(notificationData);
        }
        catch (e) {
            return false;
        }
    }
    /**
     * Set the delegate to handle pending purchases.
     * The delegate is called when the deferred transaction status updates.
     * For example, to handle purchases made using slow credit card or SCA flow purchases.
     * @param delegate delegate to be called when event happens.
     */
    static setUpdatedPurchasesDelegate(delegate) {
        const eventEmitter = new react_native_1.NativeEventEmitter(RNQonversion);
        eventEmitter.removeAllListeners(EVENT_PERMISSIONS_UPDATED);
        eventEmitter.addListener(EVENT_PERMISSIONS_UPDATED, payload => {
            const permissions = Mapper_1.default.convertPermissions(payload);
            delegate.onPermissionsUpdated(permissions);
        });
        RNQonversion.subscribeOnUpdatedPurchases();
    }
    /**
     * iOS only. Does nothing if called on Android.
     * Set the delegate to handle promo purchases.
     * The delegate is called when a promo purchase from the App Store happens.
     * @param delegate delegate to be called when event happens.
     */
    static setPromoPurchasesDelegate(delegate) {
        if (!utils_1.isIos()) {
            return;
        }
        const eventEmitter = new react_native_1.NativeEventEmitter(RNQonversion);
        eventEmitter.removeAllListeners(EVENT_PROMO_PURCHASE_RECEIVED);
        eventEmitter.addListener(EVENT_PROMO_PURCHASE_RECEIVED, productId => {
            const promoPurchaseExecutor = async () => {
                const permissions = await RNQonversion.promoPurchase(productId);
                const mappedPermissions = Mapper_1.default.convertPermissions(permissions);
                return mappedPermissions;
            };
            delegate.onPromoPurchaseReceived(productId, promoPurchaseExecutor);
        });
        RNQonversion.subscribeOnPromoPurchases();
    }
}
exports.default = Qonversion;
//# sourceMappingURL=Qonversion.js.map