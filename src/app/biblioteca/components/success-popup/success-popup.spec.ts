import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPopupComponent } from './success-popup';

describe('SuccessPopup', () => {
  let component: SuccessPopupComponent;
  let fixture: ComponentFixture<SuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
