import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPhotoHeaderComponent } from './item-photo-header.component';

describe('ItemPhotoHeaderComponent', () => {
  let component: ItemPhotoHeaderComponent;
  let fixture: ComponentFixture<ItemPhotoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemPhotoHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPhotoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
