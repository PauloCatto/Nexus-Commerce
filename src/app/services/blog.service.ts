import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { BlogPost } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private firestore = inject(Firestore);
  private postsCollection = collection(this.firestore, 'posts');

  async getPosts(): Promise<BlogPost[]> {
    try {
      const querySnapshot = await getDocs(this.postsCollection);

      const posts: BlogPost[] = [];
      querySnapshot.forEach((doc: any) => {
        posts.push({ id: doc.id, ...doc.data() } as BlogPost);
      });

      console.log('✅ Blog posts carregados do Firebase:', posts);
      return posts;
    } catch (error) {
      console.error('Falha ao buscar posts do Firebase:', error);
      return [];
    }
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.getPosts();
    return posts.find(p => p.title.toLowerCase().split(' ').join('-') === slug) ?? null;
  }
}
