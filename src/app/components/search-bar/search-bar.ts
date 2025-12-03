import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrarySort} from "./components/library-sort/library-sort";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, LibrarySort],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.scss']
})
export class SearchBar {
  isSortOpen = false;

  toggleSort() {
    this.isSortOpen = !this.isSortOpen;
  }

  closeSort() {
    this.isSortOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const clickedInsideButton = target.closest('.icon-btn');
      const clickedInsideDropdown = target.closest('.sort-dropdown');
      if (!clickedInsideButton && !clickedInsideDropdown) {
          this.closeSort();
      }
  }
}