import { ActionResultType } from "../enums";
import QonversionError from "./QonversionError";
declare class ActionResult {
    type: ActionResultType;
    value: Map<String, String | undefined> | undefined;
    error: QonversionError | undefined;
    constructor(type: ActionResultType, value: Map<String, String | undefined> | undefined, error: QonversionError | undefined);
}
export default ActionResult;
