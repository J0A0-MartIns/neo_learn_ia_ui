import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss'
})
export class Inicio {

}
