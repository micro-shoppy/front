import { Component, OnInit } from '@angular/core';
import {CatalogProductsService} from "../../common/catalog-products.service";
import {CatalogProduct} from "../../common/entities/catalog-product";
import {MatDialog} from "@angular/material/dialog";
import {SureDialogComponent} from "./sure-dialog/sure-dialog.component";
import {filter, tap} from "rxjs/operators";
import {AddProductComponent} from "./add-product/add-product.component";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  products: CatalogProduct[] = [];

  constructor(private dialog: MatDialog,
              private catalogService: CatalogProductsService) { }

  ngOnInit(): void {
    this.getCatalogProducts()
  }

  getCatalogProducts(): void {
    this.catalogService.getAllCatalogProducts().subscribe(fetchedProducts => this.products = fetchedProducts);
  }

  tryToDeleteProduct(product: CatalogProduct): void {
    const dialogRef = this.dialog.open(SureDialogComponent, {data: product});
    dialogRef.afterClosed()
      .pipe(filter(result => result))
      .subscribe(() => {
        this.catalogService.deleteProduct(product.productId).subscribe(() => this.getCatalogProducts());
      })
  }

  tryToAddProduct(): void {
    const dialogRef = this.dialog.open(AddProductComponent);
    dialogRef.afterClosed()
      .pipe(
        filter(result => result !== undefined),
        tap(() => console.log('Trying to add item...')))
      .subscribe( product => {
        this.catalogService.addProduct(product).subscribe(() => this.getCatalogProducts());
      })
  }

  logout() {
    localStorage.removeItem("access_token");
  }
}
