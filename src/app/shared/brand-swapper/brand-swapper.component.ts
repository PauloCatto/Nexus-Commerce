import { Component, inject, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { ThemePreset } from '../../models/theme.model';

import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-brand-swapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-swapper.component.html',
  styleUrls: ['./brand-swapper.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(20px) scale(0.95)', opacity: 0 }),
        animate('300ms cubic-bezier(0.16, 1, 0.3, 1)', style({ transform: 'translateY(0) scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(20px) scale(0.95)', opacity: 0 }))
      ])
    ])
  ]
})

export class BrandSwapperComponent {
  private themeService = inject(ThemeService);
  private elementRef = inject(ElementRef);
  
  isOpen = false;
  presets = this.themeService.getPresets();
  currentTheme = 'midnight';
  currentFont = 'modern';
  currentStyle: 'minimal' | 'glass' | 'bold' = 'glass';

  private fontMap: { [key: string]: string } = {
    'modern': "'Outfit', sans-serif",
    'elegant': "'Playfair Display', serif",
    'technical': "'JetBrains Mono', monospace"
  };

  constructor() {
    this.themeService.currentTheme$.subscribe(theme => this.currentTheme = theme);
    
    this.themeService.currentFont$.subscribe(font => {
      // Map back to key
      const key = Object.keys(this.fontMap).find(k => this.fontMap[k] === font);
      if (key) this.currentFont = key;
    });

    this.themeService.currentStyle$.subscribe(style => {
      this.currentStyle = style;
    });
  }

  togglePanel() { 
    this.isOpen = !this.isOpen; 
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  setTheme(name: string) { 
    this.themeService.setTheme(name); 
  }

  setFont(key: string) {
    this.currentFont = key;
    this.themeService.setFont(this.fontMap[key]);
  }

  setStyle(style: 'minimal' | 'glass' | 'bold') {
    this.currentStyle = style;
    this.themeService.setStyle(style);
  }

}

