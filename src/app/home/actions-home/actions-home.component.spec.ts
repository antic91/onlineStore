import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsHomeComponent } from './actions-home.component';

describe('ActionsHomeComponent', () => {
  let component: ActionsHomeComponent;
  let fixture: ComponentFixture<ActionsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
