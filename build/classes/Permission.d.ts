import { RenewState } from "../enums";
declare class Permission {
    permissionID: string;
    productID: string;
    isActive: boolean;
    renewState: RenewState;
    startedDate: number;
    expirationDate?: number;
    constructor(permissionID: string, productID: string, isActive: boolean, renewState: RenewState, startedDate: number, expirationDate: number | undefined);
}
export default Permission;
