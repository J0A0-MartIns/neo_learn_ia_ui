import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryPopupComponent } from './library-popup';

describe('ProjetoPopup', () => {
  let component: LibraryPopupComponent;
  let fixture: ComponentFixture<LibraryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
