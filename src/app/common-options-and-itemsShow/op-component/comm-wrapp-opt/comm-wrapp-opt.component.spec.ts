import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommWrappOptComponent } from './comm-wrapp-opt.component';

describe('CommWrappOptComponent', () => {
  let component: CommWrappOptComponent;
  let fixture: ComponentFixture<CommWrappOptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommWrappOptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommWrappOptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
