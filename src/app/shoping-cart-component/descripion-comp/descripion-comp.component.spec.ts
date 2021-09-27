import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripionCompComponent } from './descripion-comp.component';

describe('DescripionCompComponent', () => {
  let component: DescripionCompComponent;
  let fixture: ComponentFixture<DescripionCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescripionCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescripionCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
