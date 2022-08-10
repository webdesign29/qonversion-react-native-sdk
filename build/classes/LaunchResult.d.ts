import Permission from "./Permission";
import Product from "./Product";
declare class LaunchResult {
    uid: string;
    timestamp: number;
    products: Map<string, Product>;
    permissions: Map<string, Permission>;
    userProducts: Map<string, Product>;
    constructor(uid: string, timestamp: number, products: Map<string, Product>, permissions: Map<string, Permission>, userProducts: Map<string, Product>);
}
export default LaunchResult;
