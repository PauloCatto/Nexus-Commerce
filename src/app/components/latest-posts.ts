import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-latest-posts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="latest-posts container">
      <div class="section-title flex justify-between items-center" style="justify-content: center;">
        <h2>Latest posts</h2>
      </div>
      
      <div class="grid posts-grid">
        <div class="post-card" *ngFor="let p of [1,2,3,4]">
          <div class="post-image"></div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .latest-posts {
      margin-top: 5rem;
      margin-bottom: 5rem;
    }
    h2 {
      font-size: 1.4rem;
      font-weight: 600;
      color: #fff;
    }
    .posts-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
    .post-card {
      cursor: pointer;
      transition: transform 0.2s;
    }
    .post-card:hover {
      transform: translateY(-5px);
    }
    .post-image {
      background-color: var(--bg-card);
      border-radius: 8px;
      height: 250px;
      width: 100%;
    }
  `]
})
export class LatestPostsComponent {}
