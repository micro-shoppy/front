import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogProductListComponent } from './catalog-product-list.component';

describe('ProductListComponent', () => {
  let component: CatalogProductListComponent;
  let fixture: ComponentFixture<CatalogProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
