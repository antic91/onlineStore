import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonWrapperOptionsComponent } from './common-wrapper-options.component';

describe('CommonWrapperOptionsComponent', () => {
  let component: CommonWrapperOptionsComponent;
  let fixture: ComponentFixture<CommonWrapperOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonWrapperOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonWrapperOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
