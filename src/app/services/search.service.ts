import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { SearchResult } from '../models/search-result.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private firestore = inject(Firestore);

  async search(term: string): Promise<SearchResult[]> {
    if (!term || term.trim().length < 2) return [];

    const q = term.toLowerCase().trim();

    try {
      const [productsSnap, postsSnap] = await Promise.all([
        getDocs(collection(this.firestore, 'products')),
        getDocs(collection(this.firestore, 'posts'))
      ]);

      const results: SearchResult[] = [];

      productsSnap.forEach((doc: any) => {
        const data = doc.data();
        const matches =
          data.name?.toLowerCase().includes(q) ||
          data.category?.toLowerCase().includes(q) ||
          data.description?.toLowerCase().includes(q);

        if (matches) {
          results.push({
            type: 'product',
            id: doc.id,
            title: data.name,
            subtitle: data.subtitle,
            image: data.image,
            category: data.category,
            slug: data.name.toLowerCase().split(' ').join('-')
          });
        }
      });

      postsSnap.forEach((doc: any) => {
        const data = doc.data();
        const matches =
          data.title?.toLowerCase().includes(q) ||
          data.category?.toLowerCase().includes(q) ||
          data.excerpt?.toLowerCase().includes(q);

        if (matches) {
          results.push({
            type: 'post',
            id: doc.id,
            title: data.title,
            image: data.image,
            category: data.category,
            slug: data.title.toLowerCase().split(' ').join('-')
          });
        }
      });

      return results;
    } catch (error) {
      console.error('Erro na busca Firebase:', error);
      return [];
    }
  }
}
