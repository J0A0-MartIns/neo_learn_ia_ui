import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-project-card-library',
  imports: [],
  templateUrl: './project-card-library.html',
  styleUrl: './project-card-library.scss'
})
export class ProjectCardLibrary {

    @Input() project: any;
    @Output() open = new EventEmitter<void>();

  onOpen() {
    this.open.emit();
  }
}
