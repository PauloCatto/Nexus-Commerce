import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', loadComponent: () => import('./pages/shop/shop').then(m => m.Shop) },
  { path: 'story', loadComponent: () => import('./pages/our-story/our-story').then(m => m.OurStoryComponent) },
  { path: 'blog', loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.ContactComponent) },
  { path: 'product/:id', loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetail) },
  { path: 'category/:id', loadComponent: () => import('./pages/shop/shop').then(m => m.Shop) },
  { path: 'post/:id', loadComponent: () => import('./pages/post-detail/post-detail.component').then(m => m.PostDetailComponent) },
  { path: '**', loadComponent: () => import('./pages/dummy/dummy').then(m => m.Dummy) },
];
