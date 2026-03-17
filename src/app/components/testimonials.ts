import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="testimonials-section">
      <div class="container">
        <div class="section-title">
          <h2>What our customers say</h2>
          <div class="nav-arrows flex gap-2">
            <button class="arrow-btn"><span class="material-icons">chevron_left</span></button>
            <button class="arrow-btn active"><span class="material-icons">chevron_right</span></button>
          </div>
        </div>
        
        <div class="grid testimonials-grid">
          <div class="testimonial-card" *ngFor="let t of [1,2,3]">
            <div class="stars flex gap-2 mb-4">
              <span class="material-icons" *ngFor="let s of [1,2,3,4,5]">star</span>
            </div>
            <p>"Nexus transformed my tech experience! The notebooks are powerful, and the headphones are top-notch. Quick shipping and excellent customer service. Highly recommended!"</p>
            <div class="user-info flex items-center gap-4 mt-6">
              <div class="avatar"></div>
              <div>
                <h4>Leslie Alexander</h4>
                <p class="role">Model</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials-section {
      background-color: var(--bg-secondary);
      padding: 5rem 0;
      margin-top: 5rem;
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
      background-color: var(--bg-hover);
      color: var(--text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    .arrow-btn:hover, .arrow-btn.active {
      background-color: var(--text-primary);
      color: var(--bg-primary);
    }
    .testimonials-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
    .testimonial-card {
      background-color: var(--bg-primary);
      padding: 2rem;
      border-radius: 8px;
    }
    .stars {
      color: var(--text-primary);
      margin-bottom: 1rem;
    }
    .stars span { font-size: 1.2rem; }
    p {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.6;
    }
    .mt-6 { margin-top: 1.5rem; }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-color), #ec4899);
    }
    h4 {
      font-size: 0.95rem;
      color: #fff;
      font-weight: 600;
    }
    .role {
      font-size: 0.8rem;
    }
  `]
})
export class TestimonialsComponent {}
