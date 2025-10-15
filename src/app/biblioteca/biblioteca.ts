import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-biblioteca',
    imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './biblioteca.html',
  styleUrl: './biblioteca.scss'
})

export class Biblioteca implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      // sem token -> manda pro login
      this.router.navigate(['/login']);
    }
  }
}
