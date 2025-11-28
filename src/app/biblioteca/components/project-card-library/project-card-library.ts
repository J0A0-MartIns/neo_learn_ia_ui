import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-project-card-library',
  imports: [],
  templateUrl: './project-card-library.html',
  styleUrl: './project-card-library.scss'
})
export class ProjectCardLibrary {

  @Output() open = new EventEmitter<void>();

  onOpen() {
    this.open.emit();
  }
}
