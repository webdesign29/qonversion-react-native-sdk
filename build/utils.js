"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertPropertyToNativeKey = exports.isAndroid = exports.isIos = void 0;
const enums_1 = require("./enums");
const react_native_1 = require("react-native");
const isIos = () => {
    return react_native_1.Platform.OS === "ios";
};
exports.isIos = isIos;
const isAndroid = () => {
    return react_native_1.Platform.OS === "android";
};
exports.isAndroid = isAndroid;
const propertyKeyMap = {
    [enums_1.Property.EMAIL]: "EMAIL",
    [enums_1.Property.NAME]: "NAME",
    [enums_1.Property.APPS_FLYER_USER_ID]: "APPS_FLYER_USER_ID",
    [enums_1.Property.ADJUST_USER_ID]: "ADJUST_USER_ID",
    [enums_1.Property.KOCHAVA_DEVICE_ID]: "KOCHAVA_DEVICE_ID",
    [enums_1.Property.CUSTOM_USER_ID]: "CUSTOM_USER_ID",
    [enums_1.Property.FACEBOOK_ATTRIBUTION]: "FACEBOOK_ATTRIBUTION",
    [enums_1.Property.ADVERTISING_ID]: "ADVERTISING_ID" // ios only
};
const convertPropertyToNativeKey = (property) => {
    return propertyKeyMap[property];
};
exports.convertPropertyToNativeKey = convertPropertyToNativeKey;
//# sourceMappingURL=utils.js.map