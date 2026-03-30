import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { ThemePreset } from '../models/theme.model';
import { BehaviorSubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private platformId = inject(PLATFORM_ID);

  private currentThemeSubject = new BehaviorSubject<string>('midnight');
  public currentTheme$ = this.currentThemeSubject.asObservable();

  private currentFontSubject = new BehaviorSubject<string>("'Outfit', sans-serif");
  public currentFont$ = this.currentFontSubject.asObservable();

  private currentStyleSubject = new BehaviorSubject<'minimal' | 'glass' | 'bold'>('glass');
  public currentStyle$ = this.currentStyleSubject.asObservable();

  private readonly STYLE_CONFIGS = {
    minimal: {
      '--radius-base': '4px',
      '--radius-card': '8px',
      '--ui-shadow': 'none',
      '--ui-blur': '0px',
      '--ui-border-width': '1px',
      '--ui-glow': '0 0 0 rgba(0,0,0,0)'
    },
    glass: {
      '--radius-base': '14px',
      '--radius-card': '24px',
      '--ui-shadow': '0 10px 30px rgba(0,0,0,0.1)',
      '--ui-blur': '12px',
      '--ui-border-width': '1px',
      '--ui-glow': '0 4px 15px rgba(var(--primary-rgb), 0.2)'
    },
    bold: {
      '--radius-base': '30px',
      '--radius-card': '40px',
      '--ui-shadow': '0 20px 50px rgba(0,0,0,0.2)',
      '--ui-blur': '20px',
      '--ui-border-width': '2px',
      '--ui-glow': '0 8px 30px rgba(var(--primary-rgb), 0.4)'
    }
  };

  private presets: ThemePreset[] = [
    /* ... Midnight ... */
    {
      name: 'midnight',
      label: 'Midnight (Dark)',
      colors: {
        '--bg-primary': '#0a0f1a',
        '--bg-secondary': '#0d121f',
        '--bg-card': '#161c2d',
        '--bg-hover': '#1e293b',
        '--text-primary': '#ffffff',
        '--text-secondary': '#94a3b8',
        '--primary-color': '#8b5cf6',
        '--primary-hover': '#7c3aed',
        '--glass-bg': 'rgba(22, 28, 45, 0.7)',
        '--border-color': 'rgba(255, 255, 255, 0.1)',
        '--primary-rgb': '139, 92, 246'
      }
    },
    /* ... Cyberpunk ... */
    {
      name: 'cyberpunk',
      label: 'Cyberpunk',
      colors: {
        '--bg-primary': '#050505',
        '--bg-secondary': '#0a0a0a',
        '--bg-card': '#111111',
        '--bg-hover': '#1a1a1a',
        '--text-primary': '#00ff41',
        '--text-secondary': '#008f11',
        '--primary-color': '#ff003c',
        '--primary-hover': '#d00030',
        '--glass-bg': 'rgba(5, 5, 5, 0.8)',
        '--border-color': 'rgba(0, 255, 65, 0.2)',
        '--primary-rgb': '255, 0, 60'
      }
    },
    /* ... Snow ... */
    {
      name: 'snow',
      label: 'Minimal Snow',
      colors: {
        '--bg-primary': '#f8fafc',
        '--bg-secondary': '#f1f5f9',
        '--bg-card': '#ffffff',
        '--bg-hover': '#e2e8f0',
        '--text-primary': '#0f172a',
        '--text-secondary': '#475569',
        '--primary-color': '#3b82f6',
        '--primary-hover': '#2563eb',
        '--glass-bg': 'rgba(255, 255, 255, 0.7)',
        '--border-color': 'rgba(0, 0, 0, 0.1)',
        '--primary-rgb': '59, 130, 246'
      }
    },
    /* ... Forest ... */
    {
      name: 'forest',
      label: 'Organic Forest',
      colors: {
        '--bg-primary': '#052c1e',
        '--bg-secondary': '#0a3622',
        '--bg-card': '#0c4a31',
        '--bg-hover': '#115d3f',
        '--text-primary': '#ecfdf5',
        '--text-secondary': '#a7f3d0',
        '--primary-color': '#10b981',
        '--primary-hover': '#059669',
        '--glass-bg': 'rgba(5, 44, 30, 0.7)',
        '--border-color': 'rgba(255, 255, 255, 0.1)',
        '--primary-rgb': '16, 185, 129'
      }
    }
  ];

  constructor() {
    this.init();
  }

  private init() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('app-theme') || 'midnight';
      this.applyTheme(savedTheme);

      this.authService.user$.pipe(
        filter(user => !!user)
      ).subscribe(async user => {
        const profile = await this.userService.ensureProfileExists(user!);
        if (profile.theme) this.applyTheme(profile.theme);
        if (profile.fontFamily) {
          document.documentElement.style.setProperty('--font-family', profile.fontFamily);
          this.currentFontSubject.next(profile.fontFamily);
        }
        if (profile.interfaceStyle) {
          this.setStyle(profile.interfaceStyle);
        }
      });
    }
  }

  public getPresets(): ThemePreset[] {
    return this.presets;
  }

  public async setTheme(themeName: string) {
    this.applyTheme(themeName);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('app-theme', themeName);
    }
    this.authService.user$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.userService.updateProfile(user.uid, { theme: themeName });
      }
    });
  }

  public async setFont(fontFamily: string) {
    document.documentElement.style.setProperty('--font-family', fontFamily);
    this.currentFontSubject.next(fontFamily);
    this.authService.user$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.userService.updateProfile(user.uid, { fontFamily });
      }
    });
  }

  public async setStyle(styleName: 'minimal' | 'glass' | 'bold') {
    const config = this.STYLE_CONFIGS[styleName];
    const root = document.documentElement;

    Object.entries(config).forEach(([variable, value]) => {
      root.style.setProperty(variable, value);
    });

    this.currentStyleSubject.next(styleName);

    this.authService.user$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.userService.updateProfile(user.uid, { interfaceStyle: styleName });
      }
    });
  }

  private applyTheme(themeName: string) {
    const preset = this.presets.find(p => p.name === themeName) || this.presets[0];
    const root = document.documentElement;

    Object.entries(preset.colors).forEach(([variable, value]) => {
      root.style.setProperty(variable, value);
    });

    this.currentThemeSubject.next(themeName);
  }
}
