import { Component, OnInit, inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'app-latest-posts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './latest-posts.component.html',
  styleUrl: './latest-posts.component.scss'
})
export class LatestPostsComponent implements OnInit {
  posts: BlogPost[] = [];
  isLoading = true;

  private blogService = inject(BlogService);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);

  async ngOnInit(): Promise<void> {
    try {
      const posts = await this.blogService.getPosts();
      this.ngZone.run(() => {
        this.posts = posts;
        this.isLoading = false;
        this.cdr.detectChanges();
      });
    } catch (err) {
      console.error(err);
      this.ngZone.run(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      });
    }
  }
}
