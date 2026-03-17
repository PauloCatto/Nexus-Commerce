import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container flex justify-between items-center">
        <div class="logo">Nexus</div>
        <p class="copyright">&copy; 2026 Nexus Commerce. All rights reserved.</p>
        <div class="social flex gap-4">
          <a href="#" class="material-icons">facebook</a>
          <a href="#" class="material-icons">camera_alt</a>
          <a href="#" class="material-icons">email</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--bg-secondary);
      padding: 3rem 0;
      border-top: 1px solid var(--border-color);
      margin-top: 4rem;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .copyright {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }
    .social a {
      color: var(--text-secondary);
      font-size: 1.2rem;
    }
    .social a:hover {
      color: var(--accent-color);
    }
  `]
})
export class FooterComponent {}
