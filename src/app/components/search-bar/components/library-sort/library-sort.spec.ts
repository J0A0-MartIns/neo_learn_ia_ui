import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarySort } from './library-sort';

describe('LibrarySort', () => {
  let component: LibrarySort;
  let fixture: ComponentFixture<LibrarySort>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrarySort]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrarySort);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
