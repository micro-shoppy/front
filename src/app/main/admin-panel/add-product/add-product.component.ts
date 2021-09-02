import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Product} from "src/app/common/entities/product";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product = Object.assign(new Product(), {
    id: "",
    name: "",
    description: "",
    taxPercentage: 0,
    netPrice: 0
  });

  constructor(private dialogRef: MatDialogRef<AddProductComponent>) { }

  ngOnInit(): void {
  }

  onOkClick(): void {
    this.dialogRef.close(this.product);
  }

  onCancelClick(): void {
    this.dialogRef.close(undefined);
  }

}
