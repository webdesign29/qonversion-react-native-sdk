import { Property, ProrationMode, Provider } from "../enums";
import ExperimentInfo from "./ExperimentInfo";
import IntroEligibility from "./IntroEligibility";
import LaunchResult from "./LaunchResult";
import Offerings from "./Offerings";
import Permission from "./Permission";
import Product from "./Product";
import { UpdatedPurchasesDelegate } from './UpdatedPurchasesDelegate';
import { PromoPurchasesDelegate } from './PromoPurchasesDelegate';
export default class Qonversion {
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
    static launchWithKey(key: string, observerMode?: boolean): Promise<LaunchResult>;
    /**
     * Call this function to link a user to his unique ID in your system and share purchase data.
     *
     * @param userID unique user ID in your system.
     */
    static identify(userID: string): void;
    /**
     * Call this function to unlink a user from his unique ID in your system and his purchase data.
     */
    static logout(): void;
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
    static setProperty(property: Property, value: string): void;
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
    static setUserProperty(property: string, value: string): void;
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
    static setUserId(userId: string): void;
    /**
     * Sends your attribution {@link data} to the {@link provider}.
     *
     * @param data an object containing your attribution data.
     * @param provider the provider to which the data will be sent.
     */
    static addAttributionData(data: Object, provider: Provider): void;
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
    static checkPermissions(): Promise<Map<string, Permission>>;
    /**
     * Starts a process of purchasing a product with the specified identifier.
     *
     * @throws exception in case of error in purchase flow.
     * @param productId Qonversion product identifier for purchase.
     * @returns the promise with the user permissions including the ones obtained by the purchase.
     */
    static purchase(productId: string): Promise<Map<string, Permission>>;
    /**
     * Starts a process of purchasing product with Qonversion's {@link Product} object.
     *
     * @param product - Qonversion's {@link Product} object
     * @returns { Promise<Map<string, Permission>> } A map of available permissions
     */
    static purchaseProduct(product: Product): Promise<Map<string, Permission>>;
    private static purchaseProxy;
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
    static updatePurchase(productId: string, oldProductId: string, prorationMode?: ProrationMode | null): Promise<Map<string, Permission> | null>;
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
    static updatePurchaseWithProduct(product: Product, oldProductId: String, prorationMode?: ProrationMode | null): Promise<Map<string, Permission> | null>;
    /**
     * Returns Qonversion products in association with Apple and Google Play Store Products.
     *
     * @returns the promise with Qonversion products.
     *
     * @see [Product Center](https://qonversion.io/docs/product-center)
     */
    static products(): Promise<Map<string, Product>>;
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
    static offerings(): Promise<Offerings | null>;
    /**
     * Restoring purchases restores users purchases in your app, to maintain access to purchased content.
     * Users sometimes need to restore purchased content, such as when they upgrade to a new phone.
     *
     * @returns the promise with the user permissions.
     */
    static restore(): Promise<Map<string, Permission>>;
    /**
     * You can check if a user is eligible for an introductory offer, including a free trial.
     * You can show only a regular price for users who are not eligible for an introductory offer.
     *
     * @param ids products identifiers that must be checked.
     * @returns the promise with eligibility map.
     */
    static checkTrialIntroEligibilityForProductIds(ids: string[]): Promise<Map<string, IntroEligibility>>;
    static experiments(): Promise<Map<string, ExperimentInfo>>;
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
    static syncPurchases(): void;
    /**
     * You can set the flag to distinguish sandbox and production users.
     * To see the sandbox users turn on the Viewing test Data toggle on Qonversion Dashboard
     */
    static setDebugMode(): void;
    /**
     * Call this function to reset user ID and generate new anonymous user ID.
     * Call this function before Qonversion.launchWithKey()
     *
     * @deprecated This function was used in debug mode only. You can reinstall the app if you need to reset the user ID.
     */
    static resetUser(): void;
    /**
     * iOS only. Returns `null` if called on Android.
     * On iOS 14.5+, after requesting the app tracking permission using ATT, you need to notify Qonversion if tracking
     * is allowed and IDFA is available.
     */
    static setAdvertisingID(): void;
    /**
     * Enable attribution collection from Apple Search Ads. False by default.
     */
    static setAppleSearchAdsAttributionEnabled(enabled: boolean): void;
    /**
     * Set push token to Qonversion to enable Qonversion push notifications
     * @param token Firebase device token on Android. APNs device token on iOS.
     */
    static setNotificationsToken(token: string): void;
    /**
     * Call to handle push notifications sent by Qonversion Automation.
     * @param notificationData notification payload data
     * @return true when a push notification was received from Qonversion. Otherwise returns false, so you need to handle a notification yourself
     * @see [Firebase RemoteMessage data](https://pub.dev/documentation/firebase_messaging_platform_interface/latest/firebase_messaging_platform_interface/RemoteMessage/data.html)
     * @see [APNs notification data](https://developer.apple.com/documentation/usernotifications/unnotificationcontent/1649869-userinfo)
     */
    static handleNotification(notificationData: Map<String, Object>): Promise<boolean>;
    /**
     * Set the delegate to handle pending purchases.
     * The delegate is called when the deferred transaction status updates.
     * For example, to handle purchases made using slow credit card or SCA flow purchases.
     * @param delegate delegate to be called when event happens.
     */
    static setUpdatedPurchasesDelegate(delegate: UpdatedPurchasesDelegate): void;
    /**
     * iOS only. Does nothing if called on Android.
     * Set the delegate to handle promo purchases.
     * The delegate is called when a promo purchase from the App Store happens.
     * @param delegate delegate to be called when event happens.
     */
    static setPromoPurchasesDelegate(delegate: PromoPurchasesDelegate): void;
}
