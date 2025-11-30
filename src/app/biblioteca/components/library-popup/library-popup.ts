import {Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-library-popup',
  imports: [CommonModule],
  templateUrl: './library-popup.html',
  styleUrls: ['./library-popup.scss']
})
export class LibraryPopupComponent {

    @Input() project: any;
    @Input() isOpen: boolean = false;
    @Output() close = new EventEmitter<void>();
    @Output() addProject = new EventEmitter<void>();

  docs: string[] = [
    'Edital','Edital','Edital',
    'Resumo','Resumo','Resumo',
    'Edital','Edital','Edital'
  ];

  closePopup() {
    this.close.emit();
  }

  onAddProject() {
    this.addProject.emit();
  }
}
