import Offering from "./Offering";
declare class Offerings {
    main: Offering | null;
    availableOffering: Array<Offering>;
    constructor(main: Offering | null, availableOfferings: Array<Offering>);
    offeringForIdentifier(identifier: string): Offering | undefined;
}
export default Offerings;
