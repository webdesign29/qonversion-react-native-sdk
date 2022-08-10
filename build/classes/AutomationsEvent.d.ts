import { AutomationsEventType } from "../enums";
declare class AutomationsEvent {
    type: AutomationsEventType;
    date: number;
    constructor(type: AutomationsEventType, date: number);
}
export default AutomationsEvent;
