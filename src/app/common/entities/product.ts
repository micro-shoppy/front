import {CatalogProduct} from "./catalog-product";
import {SalesProduct} from "./sales-product";

export class Product {
  readonly productId: string;
  readonly name: string;
  readonly description: string;
  readonly photo: string;
  readonly netPrice: number;
  readonly taxPercentage: number;
}

export function mergeProducts(catalogProduct: CatalogProduct, salesProduct: SalesProduct): Product {
  if (catalogProduct.productId === salesProduct.productId) {
    return Object.assign(new Product(), {
      name: catalogProduct.name,
      description: catalogProduct.description,
      photo: catalogProduct.photo,
      netPrice: salesProduct.netPrice,
      taxPercentage: salesProduct.taxPercentage,
      productId: salesProduct.productId
    });
  }
  throw new Error('Catalog product and Sales product have different ids, thus can\'t be merged')
}
