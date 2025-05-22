import { Component, inject, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { SaudacaoComponent } from '../../components/saudacao/saudacao.component';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SaudacaoComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  
  @ViewChild('videoIframe') videoIframe!: ElementRef;
  
  showVideo = false;
  videoUrl = "https://www.youtube-nocookie.com/embed/vQsryuNmsL0?controls=0&autoplay=1&modestbranding=0&loop=1&mute=1&rel=0&hd=1&enablejsapi=1";
  private carouselInterval: any;
  private videoCurrentTime = 0;

  // Array de imagens para o carrossel
  backgroundImages = [
    'images/ranger.png',
    'images/territory.png',
    'images/broncoSport.png',
    'images/mustang.png'
  ];
  
  currentImageIndex = 0;
  currentImage = this.backgroundImages[0];

  ngOnInit() {
    this.startCarousel();
    this.setupVideoListeners();
  }

  ngOnDestroy() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
    window.removeEventListener('message', this.handleVideoMessage);
  }

  startCarousel() {
    this.carouselInterval = setInterval(() => {
      if (!this.showVideo) {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.backgroundImages.length;
        this.currentImage = this.backgroundImages[this.currentImageIndex];
      }
    }, 3000);
  }

  toggleVideo() {
    this.showVideo = !this.showVideo;
    if (this.showVideo) {
      this.pauseCarousel();
    } else {
      this.resumeCarousel();
    }
  }

  pauseCarousel() {
    clearInterval(this.carouselInterval);
  }

  resumeCarousel() {
    this.startCarousel();
  }

  private setupVideoListeners() {
    window.addEventListener('message', this.handleVideoMessage.bind(this));
  }

  private handleVideoMessage(event: MessageEvent) {
    if (event.origin.includes('youtube') && event.data && event.data.info) {
      this.videoCurrentTime = event.data.info.currentTime;
    }
  }

  // Método chamado quando o vídeo é carregado
  onVideoLoad() {
    // Pode adicionar lógica adicional aqui se necessário
    console.log('Vídeo carregado');
  }

  get safeVideoUrl(): SafeResourceUrl {
    const urlWithTime = this.showVideo 
      ? `${this.videoUrl}&start=${Math.floor(this.videoCurrentTime)}`
      : this.videoUrl;
    return this.sanitizer.bypassSecurityTrustResourceUrl(urlWithTime);
  }
}