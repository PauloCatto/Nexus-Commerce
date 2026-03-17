import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header';
import { HeroComponent } from '../components/hero';
import { CategoriesComponent } from '../components/categories';
import { BestsellersComponent } from '../components/bestsellers';
import { ElevateComponent } from '../components/elevate';
import { TestimonialsComponent } from '../components/testimonials';
import { LatestPostsComponent } from '../components/latest-posts';
import { FooterComponent } from '../shared/footer';

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
