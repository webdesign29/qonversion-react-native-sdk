"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const Mapper_1 = __importDefault(require("./Mapper"));
const { RNAutomations } = react_native_1.NativeModules;
const EVENT_SCREEN_SHOWN = "automations_screen_shown";
const EVENT_ACTION_STARTED = "automations_action_started";
const EVENT_ACTION_FAILED = "automations_action_failed";
const EVENT_ACTION_FINISHED = "automations_action_finished";
const EVENT_AUTOMATIONS_FINISHED = "automations_finished";
class Automations {
    /**
     * The Automations delegate is responsible for handling in-app screens and actions when push notification is received.
     * Make sure the method is called before Qonversion.handleNotification.
     * @param delegate the delegate to be notified about Automations events.
     */
    static setDelegate(delegate) {
        Automations.subscribe(delegate);
    }
    static subscribe(automationsDelegate) {
        const eventEmitter = new react_native_1.NativeEventEmitter(RNAutomations);
        eventEmitter.removeAllListeners(EVENT_SCREEN_SHOWN);
        eventEmitter.addListener(EVENT_SCREEN_SHOWN, screenId => {
            automationsDelegate.automationsDidShowScreen(screenId);
        });
        eventEmitter.removeAllListeners(EVENT_ACTION_STARTED);
        eventEmitter.addListener(EVENT_ACTION_STARTED, payload => {
            const actionResult = Mapper_1.default.convertActionResult(payload);
            automationsDelegate.automationsDidStartExecuting(actionResult);
        });
        eventEmitter.removeAllListeners(EVENT_ACTION_FAILED);
        eventEmitter.addListener(EVENT_ACTION_FAILED, payload => {
            const actionResult = Mapper_1.default.convertActionResult(payload);
            automationsDelegate.automationsDidFailExecuting(actionResult);
        });
        eventEmitter.removeAllListeners(EVENT_ACTION_FINISHED);
        eventEmitter.addListener(EVENT_ACTION_FINISHED, payload => {
            const actionResult = Mapper_1.default.convertActionResult(payload);
            automationsDelegate.automationsDidFinishExecuting(actionResult);
        });
        eventEmitter.removeAllListeners(EVENT_AUTOMATIONS_FINISHED);
        eventEmitter.addListener(EVENT_AUTOMATIONS_FINISHED, () => {
            automationsDelegate.automationsFinished();
        });
        RNAutomations.subscribe();
    }
}
exports.default = Automations;
//# sourceMappingURL=Automations.js.map