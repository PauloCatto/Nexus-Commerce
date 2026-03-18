import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit {
  post: any = null;

  allPosts = [
    { 
      title: 'The Future of Gaming Laptops in 2024',
      date: 'Mar 15, 2026',
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=1200',
      category: 'Gaming',
      content: 'The landscape of gaming laptops is shifting once again. With new GPU architectures from NVIDIA and AMD on the horizon, we expect to see unprecedented power in slim form factors...'
    },
    { 
      title: 'Top 5 Mechanical Keyboards for Programming',
      date: 'Mar 12, 2026',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
      category: 'Setup',
      content: 'Programmers spend thousands of hours typing. A specialized mechanical keyboard isn\'t just a luxury; it\'s a tool for career longevity and comfort...'
    },
    { 
      title: 'How to Build the Ultimate Home Workspace',
      date: 'Mar 08, 2026',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
      category: 'Workspace',
      content: 'A workspace is more than just a desk and a chair. It’s an ecosystem of productivity. From lighting to cable management, every detail matters...'
    },
    { 
      title: 'Cybersecurity Practices You Should Adopt Today',
      date: 'Mar 05, 2026',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
      category: 'Security',
      content: 'The digital world is becoming increasingly hostile. Protecting your personal and professional data is no longer optional. Here are 5 ways to secure your life...'
    },
    { 
      title: 'Why 32GB of RAM is the new standard',
      date: 'Mar 01, 2026',
      image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&q=80&w=1200',
      category: 'Hardware',
      content: 'In 2024, if you\'re a professional using creative software or a gamer running latest titles, 16GB is barely cutting it. We break down why 32GB is the sweet spot...'
    },
    { 
      title: 'The Rise of Ultrawide Monitors',
      date: 'Feb 25, 2026',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
      category: 'Displays',
      content: 'Once a niche for video editors, ultra-wide monitors are now dominating the desks of gamers and office workers alike. Is that extra screen real estate worth the cost?'
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['id'];
      if (slug) {
        this.post = this.allPosts.find(p => p.title.toLowerCase().split(' ').join('-') === slug);
      }
    });
  }
}
