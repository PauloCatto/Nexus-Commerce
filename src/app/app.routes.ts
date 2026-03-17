import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', loadComponent: () => import('./pages/shop/shop').then(m => m.Shop) },
  { path: 'blog', loadComponent: () => import('./pages/dummy/dummy').then(m => m.Dummy) },
  { path: 'product/:id', loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetail) },
  { path: 'category/:id', loadComponent: () => import('./pages/shop/shop').then(m => m.Shop) },
  { path: 'post/:id', loadComponent: () => import('./pages/dummy/dummy').then(m => m.Dummy) },
  { path: '**', redirectTo: '' },
];
