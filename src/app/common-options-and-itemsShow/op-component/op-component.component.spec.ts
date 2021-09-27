import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpComponentComponent } from './op-component.component';

describe('OpComponentComponent', () => {
  let component: OpComponentComponent;
  let fixture: ComponentFixture<OpComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
