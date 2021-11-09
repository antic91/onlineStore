import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallerDropDownComponent } from './smaller-drop-down.component';

describe('SmallerDropDownComponent', () => {
  let component: SmallerDropDownComponent;
  let fixture: ComponentFixture<SmallerDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallerDropDownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallerDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
