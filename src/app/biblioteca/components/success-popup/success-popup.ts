import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-success-popup',
  imports: [CommonModule],
  templateUrl: './success-popup.html',
  styleUrls: ['./success-popup.scss']
})
export class SuccessPopupComponent {

  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }
}
