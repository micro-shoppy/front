import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../common/products.service";
import {Product} from "../../common/entities/product";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(fetchedProducts => this.products = fetchedProducts);
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

}
