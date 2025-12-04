import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {RouterModule} from "@angular/router";
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
    imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit, OnDestroy {
  userName: string = 'Usuário';
  currentSlide = 0;

  //Caminho das imagens
  slides = [
    { url: 'assets/banner1.png', title: 'Bem-vindo ao NeoLearnIA' },
    { url: 'assets/banner2.png', title: 'Estude com Tecnologia' },
    { url: 'assets/banner3.png', title: 'Organize seu Futuro' }
  ];

  private autoSlideInterval: any;

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.carregarNomeUsuario();
      this.startAutoSlide();
    }
  }

  ngOnDestroy(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  carregarNomeUsuario() {
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.userName = data.userFirstName;
      },
      error: (err) => {
        console.warn('Não foi possível carregar o nome do usuário');
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }
  
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.resetTimer();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  resetTimer() {
    if (isPlatformBrowser(this.platformId)) {
      clearInterval(this.autoSlideInterval);
      this.startAutoSlide();
    }
  }
}
