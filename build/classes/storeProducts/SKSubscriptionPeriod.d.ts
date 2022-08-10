import { SKPeriodUnits } from "../../enums";
declare class SKSubscriptionPeriod {
    numberOfUnits: number;
    unit: SKPeriodUnits;
    constructor(numberOfUnits: number, unit: SKPeriodUnits);
}
export default SKSubscriptionPeriod;
