import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../common/entities/product";

@Component({
  selector: 'app-catalog-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input()
  product: Product

  constructor() { }

  ngOnInit(): void {
    console.log(this.product)
  }

}
