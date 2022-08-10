import ExperimentGroup from "./ExperimentGroup";
declare class ExperimentInfo {
    identifier: string;
    group: ExperimentGroup;
    constructor(identifier: string, group: ExperimentGroup);
}
export default ExperimentInfo;
