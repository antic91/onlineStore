import { ComponentFixture, TestBed } from '@angular/core/testing';

import { sliderComponent } from './slider.component';

describe('PriceComponent', () => {
  let component: sliderComponent;
  let fixture: ComponentFixture<sliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ sliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(sliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
