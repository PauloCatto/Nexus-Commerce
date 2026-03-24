import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { StoryService } from '../../services/story.service';
import { StoryData } from '../../models/story.model';

@Component({
  selector: 'app-our-story',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './our-story.component.html',
  styleUrl: './our-story.component.scss'
})
export class OurStoryComponent implements OnInit {
  storyData: StoryData | null = null;
  isLoading = true;

  private storyService = inject(StoryService);
  private cdr = inject(ChangeDetectorRef);

  async ngOnInit() {
    try {
      this.storyData = await this.storyService.getStoryData();
    } catch (error) {
      console.error('Error fetching story data:', error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
}
