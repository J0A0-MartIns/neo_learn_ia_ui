import { Component, OnInit } from '@angular/core';
import {RouterModule, Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss'
})
export class Inicio implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            this.router.navigate(['/login']);
        }
    }

}
