import { AutomationsDelegate } from "./AutomationsDelegate";
export default class Automations {
    /**
     * The Automations delegate is responsible for handling in-app screens and actions when push notification is received.
     * Make sure the method is called before Qonversion.handleNotification.
     * @param delegate the delegate to be notified about Automations events.
     */
    static setDelegate(delegate: AutomationsDelegate): void;
    private static subscribe;
}
