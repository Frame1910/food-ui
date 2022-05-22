import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodProfileComponent } from './food-profile.component';

describe('FoodProfileComponent', () => {
  let component: FoodProfileComponent;
  let fixture: ComponentFixture<FoodProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
