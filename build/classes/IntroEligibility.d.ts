import { IntroEligibilityStatus } from "../enums";
declare class IntroEligibility {
    status?: IntroEligibilityStatus;
    constructor(status: IntroEligibilityStatus | undefined);
}
export default IntroEligibility;
