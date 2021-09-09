import {CatalogProduct} from "./catalog-product";
import {SalesProduct} from "./sales-product";

export class Product {
  readonly id: string;
  name: string;
  description: string;
  netPrice: number;
  taxPercentage: number;
  cost: number | undefined;

  static readonly placeholder: Product = Object.assign(new Product(), {
    name: 'Loading...',
    description: 'Loading...',
    netPrice: -1,
    taxPercentage: -100,
    id: 0
  })

  get grossPrice(): number {
    return this.netPrice * (1 + this.taxPercentage/100)
  }
}

export function mergeProduct(catalogProduct: CatalogProduct, salesProduct: SalesProduct): Product {
  if (catalogProduct.productId === salesProduct.productId) {
    return Object.assign(new Product(), {
      name: catalogProduct.name,
      description: catalogProduct.description,
      netPrice: salesProduct.netPrice,
      taxPercentage: salesProduct.taxPercentage,
      id: salesProduct.productId
    });
  }
  throw new Error('Catalog product and Sales product have different ids, thus can\'t be merged')
}

export function mergeProducts(catalogProducts: CatalogProduct[], salesProducts: SalesProduct[]): Product[] {
  if (catalogProducts.length > 0 && salesProducts.length > 0 && catalogProducts.length == salesProducts.length) {
    let products = [];
    catalogProducts.forEach(c =>
      products = [...products, mergeProduct(c, salesProducts.find(s => s.productId === c.productId))])
    return products;
  }
  else {
    throw new Error('Illegal length of products lists!')
  }
}
