import { OfferingTags } from "../enums";
import Product from "./Product";
declare class Offering {
    id: string;
    tag: OfferingTags;
    products: Array<Product>;
    constructor(id: string, tag: OfferingTags, products: Product[]);
    productForIdentifier(identifier: string): Product | undefined;
}
export default Offering;
