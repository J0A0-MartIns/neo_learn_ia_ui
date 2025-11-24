import {Component, OnInit} from '@angular/core';
import {RouterModule, Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {SearchBar} from "../components/search-bar/search-bar";
import {ProjectCardLibrary} from "../components/project-card-library/project-card-library";

@Component({
  selector: 'app-biblioteca',
    imports: [CommonModule, RouterModule, SearchBar, ProjectCardLibrary],
  standalone: true,
  templateUrl: './biblioteca.html',
  styleUrl: './biblioteca.scss'
})
export class Biblioteca implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            this.router.navigate(['/login']);
        }
    }
}
