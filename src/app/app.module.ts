import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FooterComponent} from './footer/footer.component';
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {ProductListComponent} from './home/product-list/product-list.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { ProductComponent } from './home/product-list/product/product.component';
import { ProductViewComponent } from './product-view/product-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    ProductListComponent,
    ProductComponent,
    ProductViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'}
    ]),
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
