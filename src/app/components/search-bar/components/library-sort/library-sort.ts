import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-library-sort',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library-sort.html',
  styleUrls: ['./library-sort.scss']
})
export class LibrarySort {
  @Output() close = new EventEmitter<void>();

  closeSort() {
    this.close.emit();
  }
}
