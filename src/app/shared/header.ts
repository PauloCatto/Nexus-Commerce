import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="container flex items-center justify-between">
        <div class="logo">Nexus</div>
        
        <nav class="nav-links">
          <a href="#" class="active">Home</a>
          <a href="#">Shop</a>
          <a href="#">Our Story</a>
          <a href="#">Blog</a>
          <a href="#">Contact Us</a>
        </nav>

        <div class="actions flex items-center gap-6">
          <div class="icons flex gap-4">
            <span class="material-icons">search</span>
            <span class="material-icons">favorite_border</span>
            <span class="material-icons">shopping_cart</span>
          </div>
          <button class="btn-primary">Login</button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      padding: 1.5rem 0;
      background-color: transparent;
    }
    .logo {
      font-size: 1.8rem;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .nav-links {
      display: flex;
      gap: 1.5rem;
      font-size: 0.95rem;
      font-weight: 500;
    }
    .nav-links a {
      color: var(--text-secondary);
    }
    .nav-links a.active, .nav-links a:hover {
      color: var(--text-primary);
    }
    .icons span {
      font-size: 1.2rem;
      cursor: pointer;
      color: var(--text-primary);
      transition: color 0.2s;
    }
    .icons span:hover {
      color: var(--accent-color);
    }
  `]
})
export class HeaderComponent {}
