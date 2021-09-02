import {Component, Inject} from '@angular/core';
import {CatalogProduct} from "../../../common/entities/catalog-product";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-sure-dialog',
  templateUrl: './sure-dialog.component.html',
  styleUrls: ['./sure-dialog.component.css']
})
export class SureDialogComponent{

  constructor(private dialogRef: MatDialogRef<SureDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public product: CatalogProduct) { }

  onOkClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

}
