import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  posts = [
    { 
      title: 'The Future of Gaming Laptops in 2024',
      excerpt: 'Discover what to expect from the next generation of portable gaming machines and their powerful new GPUs.',
      date: 'Mar 15, 2026',
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800',
      category: 'Gaming'
    },
    { 
      title: 'Top 5 Mechanical Keyboards for Programming',
      excerpt: 'Boost your typing speed and comfort with our top picks for mechanical keyboards tailored for developers.',
      date: 'Mar 12, 2026',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      category: 'Setup'
    },
    { 
      title: 'How to Build the Ultimate Home Workspace',
      excerpt: 'Create a productive and ergonomic environment that enhances your daily workflow and reduces fatigue.',
      date: 'Mar 08, 2026',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
      category: 'Workspace'
    },
    { 
      title: 'Cybersecurity Practices You Should Adopt Today',
      excerpt: 'Stay safe online by implementing these essential security protocols for your personal and professional data.',
      date: 'Mar 05, 2026',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      category: 'Security'
    },
    { 
      title: 'Why 32GB of RAM is the new standard',
      excerpt: 'As applications and games become more demanding, we look at why 16GB might no longer be enough.',
      date: 'Mar 01, 2026',
      image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&q=80&w=800',
      category: 'Hardware'
    },
    { 
      title: 'The Rise of Ultrawide Monitors',
      excerpt: 'Is a 21:9 aspect ratio worth the investment for your productivity and gaming needs?',
      date: 'Feb 25, 2026',
      image: 'https://images.unsplash.com/photo-1593640495253-23196b27a03f?auto=format&fit=crop&q=80&w=800',
      category: 'Displays'
    }
  ];
}
