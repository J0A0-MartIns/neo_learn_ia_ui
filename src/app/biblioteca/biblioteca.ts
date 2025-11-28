import {Component, OnInit} from '@angular/core';
import {RouterModule, Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {SearchBar} from "../components/search-bar/search-bar";
import {ProjectCardLibrary} from "./components/project-card-library/project-card-library";
import {LibraryPopupComponent} from "./components/library-popup/library-popup";
import {SuccessPopupComponent} from "./components/success-popup/success-popup";

@Component({
  selector: 'app-biblioteca',
    imports: [CommonModule, RouterModule, SearchBar, ProjectCardLibrary, LibraryPopupComponent, SuccessPopupComponent],
  standalone: true,
  templateUrl: './biblioteca.html',
  styleUrl: './biblioteca.scss'
})
export class Biblioteca implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {
        const token = localStorage.getItem('auth_token');
        if (token) {
            this.router.navigate(['/login']);
        }
    }

    popupOpen: boolean = false;
    successOpen: boolean = false;

    openPopup(){
        this.popupOpen = true;
    }

    closePopup(){
        this.popupOpen = false;
    }

    openSuccessPopup() {
        this.popupOpen = false;
        this.successOpen = true;
    }

    closeSuccessPopup() {
        this.successOpen = false;
    }
}
