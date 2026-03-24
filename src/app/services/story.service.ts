import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { StoryData } from '../models/story.model';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private firestore = inject(Firestore);
  private storyCollection = collection(this.firestore, 'story');

  constructor() { }

  async getStoryData(): Promise<StoryData | null> {
    try {
      const querySnapshot = await getDocs(this.storyCollection);

      let data: StoryData | null = null;
      querySnapshot.forEach((doc: any) => {
        data = doc.data() as StoryData;
      });

      return data;
    } catch (error) {
      console.error('Erro ao acessar Firebase Story:', error);
      return null;
    }
  }
}
