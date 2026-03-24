import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private firestore = inject(Firestore);
  private categoriesCollection = collection(this.firestore, 'categories');

  async getCategories(): Promise<Category[]> {
    try {
      const querySnapshot = await getDocs(this.categoriesCollection);

      const categories: Category[] = [];
      querySnapshot.forEach((doc: any) => {
        categories.push({ id: doc.id, ...doc.data() } as Category);
      });

      return categories;
    } catch (error) {
      console.error('Falha ao buscar categorias do Firebase:', error);
      return [];
    }
  }
}
