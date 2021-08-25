import {Component, Input, OnInit} from '@angular/core';
import {CatalogProduct} from "../../../common/entities/catalog-product";

@Component({
  selector: 'app-catalog-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input()
  product: CatalogProduct

  constructor() { }

  ngOnInit(): void {
  }

}
