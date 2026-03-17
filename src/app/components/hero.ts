import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero container">
      <div class="hero-content">
        <span class="subtitle">Latest release</span>
        <h1 class="title">Alienware M16</h1>
        <p class="discount">UP TO 20% DISCOUNT</p>
        <button class="btn-primary flex items-center gap-2">
          Shop Now <span class="material-icons" style="font-size: 1.1rem">arrow_forward</span>
        </button>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background-color: var(--bg-card);
      border-radius: 12px;
      margin-top: 2rem;
      height: 480px;
      display: flex;
      align-items: center;
      padding: 4rem;
      position: relative;
      overflow: hidden;
    }
    .hero-content {
      position: relative;
      z-index: 2;
    }
    .subtitle {
      font-size: 1rem;
      color: #cbd5e1;
      font-weight: 500;
    }
    .title {
      font-size: 4rem;
      font-weight: 800;
      margin: 0.5rem 0;
      line-height: 1.1;
      letter-spacing: -1px;
    }
    .discount {
      font-size: 0.9rem;
      font-weight: 600;
      font-style: italic;
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }
  `]
})
export class HeroComponent {}
