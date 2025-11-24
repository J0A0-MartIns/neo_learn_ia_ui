import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardLibrary } from './project-card-library';

describe('ProjectCardLibrary', () => {
  let component: ProjectCardLibrary;
  let fixture: ComponentFixture<ProjectCardLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardLibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCardLibrary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
