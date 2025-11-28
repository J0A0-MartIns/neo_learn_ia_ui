import { Component } from '@angular/core';
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
}