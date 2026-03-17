import { Component } from '@angular/core';

@Component({
  selector: 'app-elevate',
  standalone: true,
  template: `
    <section class="elevate container">
      <div class="elevate-wrapper">
        <div class="elevate-content">
          <h2>Elevate Your Tech Experience</h2>
          <p>Explore top-notch notebooks, headphones, and more. Elevate your tech game with products designed for excellence and style.</p>
          <button class="btn-primary">Buy now</button>
        </div>
        <div class="elevate-image"></div>
      </div>
    </section>
  `,
  styles: [`
    .elevate {
      margin-top: 8rem;
    }
    .elevate-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: stretch;
      gap: 4rem;
    }
    .elevate-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 1.5rem;
    }
    h2 {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.2;
    }
    p {
      color: var(--text-secondary);
      font-size: 1rem;
      line-height: 1.6;
      max-width: 90%;
    }
    .elevate-image {
      background-color: var(--bg-card);
      border-radius: 8px;
      min-height: 400px;
    }
  `]
})
export class ElevateComponent {}
