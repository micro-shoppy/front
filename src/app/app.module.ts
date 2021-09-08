import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FooterComponent} from './footer/footer.component';
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {ProductListComponent} from './main/product-list/product-list.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {ProductComponent} from './main/product-list/product/product.component';
import {ProductViewComponent} from './main/product-view/product-view.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {ShoppingCartComponent} from './main/shopping-cart/shopping-cart.component';
import {shoppingCartReducer} from "./main/shopping-cart/settings/shopping-cart.reducer";
import {MatButtonModule} from "@angular/material/button";
import {AdminPanelComponent} from './main/admin-panel/admin-panel.component';
import {FormsModule} from "@angular/forms";
import {SureDialogComponent} from './main/admin-panel/sure-dialog/sure-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AddProductComponent} from './main/admin-panel/add-product/add-product.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {UserPanelComponent} from './main/user-panel/user-panel.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    ProductListComponent,
    ProductComponent,
    ProductViewComponent,
    ShoppingCartComponent,
    AdminPanelComponent,
    SureDialogComponent,
    AddProductComponent,
    UserPanelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: ProductListComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent, pathMatch: 'full'},
      {path: 'admin-panel', component: AdminPanelComponent, pathMatch: 'full'},
      {path: 'login', component: UserPanelComponent, pathMatch: 'full'},
      {path: ':id', component: ProductViewComponent}
    ]),
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('shopping-cart', shoppingCartReducer),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
