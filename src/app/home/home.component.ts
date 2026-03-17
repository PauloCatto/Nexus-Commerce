import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { HeroComponent } from '../components/hero/hero.component';
import { CategoriesComponent } from '../components/categories/categories.component';
import { BestsellersComponent } from '../components/bestsellers/bestsellers.component';
import { ElevateComponent } from '../components/elevate/elevate.component';
import { TestimonialsComponent } from '../components/testimonials/testimonials.component';
import { LatestPostsComponent } from '../components/latest-posts/latest-posts.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    CategoriesComponent,
    BestsellersComponent,
    ElevateComponent,
    TestimonialsComponent,
    LatestPostsComponent,
    FooterComponent
  ],
  template: `
    <app-header></app-header>
    <main>
      <app-hero></app-hero>
      <app-categories></app-categories>
      <app-bestsellers></app-bestsellers>
      <app-elevate></app-elevate>
      <app-testimonials></app-testimonials>
      <app-latest-posts></app-latest-posts>
    </main>
    <app-footer></app-footer>
  `
})
export class HomeComponent {}
