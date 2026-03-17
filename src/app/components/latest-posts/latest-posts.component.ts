import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-latest-posts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './latest-posts.component.html',
  styleUrl: './latest-posts.component.scss'
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
