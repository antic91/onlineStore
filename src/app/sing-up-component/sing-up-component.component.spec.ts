import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingUpComponentComponent } from './sing-up-component.component';

describe('SingUpComponentComponent', () => {
  let component: SingUpComponentComponent;
  let fixture: ComponentFixture<SingUpComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingUpComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingUpComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
