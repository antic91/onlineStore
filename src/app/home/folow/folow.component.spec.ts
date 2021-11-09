import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolowComponent } from './folow.component';

describe('FolowComponent', () => {
  let component: FolowComponent;
  let fixture: ComponentFixture<FolowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
