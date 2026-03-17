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
        <div class="post-card" *ngFor="let post of posts">
          <div class="post-image-wrapper">
            <img [src]="post.image" [alt]="post.title" class="post-img">
          </div>
          <div class="post-content">
            <span class="post-date">{{ post.date }}</span>
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-excerpt">{{ post.excerpt }}</p>
          </div>
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
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: transform 0.2s;
    }
    .post-card:hover {
      transform: translateY(-5px);
    }
    .post-image-wrapper {
      background-color: var(--bg-card);
      border-radius: 8px;
      height: 200px;
      width: 100%;
      overflow: hidden;
    }
    .post-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .post-card:hover .post-img {
      transform: scale(1.05);
    }
    .post-content {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .post-date {
      font-size: 0.8rem;
      color: var(--primary-color, #3b82f6);
      font-weight: 500;
    }
    .post-title {
      font-size: 1.05rem;
      font-weight: 600;
      color: #fff;
      margin: 0;
      line-height: 1.3;
    }
    .post-excerpt {
      font-size: 0.85rem;
      color: var(--text-secondary, #94a3b8);
      line-height: 1.5;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class LatestPostsComponent {
  posts = [
    { 
      title: 'The Future of Gaming Laptops in 2024',
      excerpt: 'Discover what to expect from the next generation of portable gaming machines and their powerful new GPUs.',
      date: 'Mar 15, 2026',
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=600'
    },
    { 
      title: 'Top 5 Mechanical Keyboards for Programming',
      excerpt: 'Boost your typing speed and comfort with our top picks for mechanical keyboards tailored for developers.',
      date: 'Mar 12, 2026',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600'
    },
    { 
      title: 'How to Build the Ultimate Home Workspace',
      excerpt: 'Create a productive and ergonomic environment that enhances your daily workflow and reduces fatigue.',
      date: 'Mar 08, 2026',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600'
    },
    { 
      title: 'Cybersecurity Practices You Should Adopt Today',
      excerpt: 'Stay safe online by implementing these essential security protocols for your personal and professional data.',
      date: 'Mar 05, 2026',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600'
    }
  ];
}
