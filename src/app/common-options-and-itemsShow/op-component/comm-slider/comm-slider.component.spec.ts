import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommSliderComponent } from './comm-slider.component';

describe('CommSliderComponent', () => {
  let component: CommSliderComponent;
  let fixture: ComponentFixture<CommSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
