import { Component, OnInit, inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  isLoading = true;

  private categoryService = inject(CategoryService);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);

  async ngOnInit(): Promise<void> {
    try {
      const categories = await this.categoryService.getCategories();
      this.ngZone.run(() => {
        this.categories = categories;
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
