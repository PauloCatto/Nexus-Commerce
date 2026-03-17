import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="categories container">
      <div class="section-title">
        <h2>Shop by categories</h2>
        <div class="nav-arrows flex gap-2">
          <button class="arrow-btn"><span class="material-icons">chevron_left</span></button>
          <button class="arrow-btn active"><span class="material-icons">chevron_right</span></button>
        </div>
      </div>
      
      <div class="grid categories-grid">
        <div class="category-card" *ngFor="let cat of categories">
          <h3>{{ cat }}</h3>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .categories {
      margin-top: 6rem;
    }
    h2 {
      font-size: 1.4rem;
      font-weight: 600;
      color: #fff;
    }
    .arrow-btn {
      width: 36px;
      height: 36px;
      border-radius: 4px;
      background-color: var(--bg-card);
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    .arrow-btn:hover, .arrow-btn.active {
      background-color: var(--text-primary);
      color: var(--bg-primary);
    }
    .categories-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
    .category-card {
      background-color: var(--bg-card);
      border-radius: 8px;
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .category-card:hover {
      transform: translateY(-5px);
    }
    .category-card h3 {
      font-size: 1.1rem;
      font-weight: 500;
    }
  `]
})
export class CategoriesComponent {
  categories = ['Controller', 'Mouse', 'Headset', 'Notebooks'];
}
