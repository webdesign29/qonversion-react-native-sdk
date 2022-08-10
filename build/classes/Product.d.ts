import { ProductDurations, ProductTypes, TrialDurations } from "../enums";
import SKProduct from "./storeProducts/SKProduct";
import SkuDetails from "./storeProducts/SkuDetails";
declare class Product {
    qonversionID: string;
    storeID: string;
    type: ProductTypes;
    duration: ProductDurations;
    skuDetails: SkuDetails | null;
    skProduct: SKProduct | null;
    prettyPrice?: string;
    trialDuration?: TrialDurations;
    price?: number;
    currencyCode?: string;
    storeTitle?: string;
    storeDescription?: string;
    prettyIntroductoryPrice?: string;
    offeringId?: string | null;
    constructor(qonversionID: string, storeID: string, type: ProductTypes, duration: ProductDurations, skuDetails: SkuDetails | null, skProduct: SKProduct | null, prettyPrice: string | undefined, trialDuration: TrialDurations | undefined, price: number | undefined, currencyCode: string | undefined, storeTitle: string | undefined, storeDescription: string | undefined, prettyIntroductoryPrice: string | undefined, offeringId: string | null);
}
export default Product;
