import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopingCartComponentComponent } from './shoping-cart-component.component';

describe('ShopingCartComponentComponent', () => {
  let component: ShopingCartComponentComponent;
  let fixture: ComponentFixture<ShopingCartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopingCartComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopingCartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
