import { Directive, ElementRef, HostListener, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appParallax3d]',
  standalone: true
})
export class Parallax3dDirective implements OnInit {
  @Input() parallaxIntensity = 15;
  @Input() transitionSpeed = '300ms';
  
  private shineElement!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.setupShineEffect();
    this.renderer.setStyle(this.el.nativeElement, 'transition', `transform ${this.transitionSpeed} cubic-bezier(0.16, 1, 0.3, 1)`);
    this.renderer.setStyle(this.el.nativeElement, 'transform-style', 'preserve-3d');
  }

  private setupShineEffect() {
    this.shineElement = this.renderer.createElement('div');
    this.renderer.addClass(this.shineElement, 'parallax-shine');
    this.renderer.setStyle(this.shineElement, 'position', 'absolute');
    this.renderer.setStyle(this.shineElement, 'top', '0');
    this.renderer.setStyle(this.shineElement, 'left', '0');
    this.renderer.setStyle(this.shineElement, 'width', '100%');
    this.renderer.setStyle(this.shineElement, 'height', '100%');
    this.renderer.setStyle(this.shineElement, 'pointer-events', 'none');
    this.renderer.setStyle(this.shineElement, 'z-index', '5');
    this.renderer.setStyle(this.shineElement, 'background', 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 60%)');
    this.renderer.setStyle(this.shineElement, 'opacity', '0');
    this.renderer.setStyle(this.shineElement, 'transition', 'opacity 300ms ease');
    
    // Ensure the host has relative positioning
    const currentPos = window.getComputedStyle(this.el.nativeElement).position;
    if (currentPos === 'static') {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    }
    
    this.renderer.appendChild(this.el.nativeElement, this.shineElement);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const card = this.el.nativeElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -this.parallaxIntensity;
    const rotateY = ((x - centerX) / centerX) * this.parallaxIntensity;
    
    this.renderer.setStyle(card, 'transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    
    // Move shine effect
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;
    this.renderer.setStyle(this.shineElement, 'background', `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`);
    this.renderer.setStyle(this.shineElement, 'opacity', '1');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
    this.renderer.setStyle(this.shineElement, 'opacity', '0');
  }
}
