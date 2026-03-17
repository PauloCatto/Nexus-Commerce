import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', loadComponent: () => import('./pages/dummy/dummy').then(m => m.Dummy) },
  { path: 'blog', loadComponent: () => import('./pages/dummy/dummy').then(m => m.Dummy) },
  { path: 'product/:id', loadComponent: () => import('./pages/dummy/dummy').then(m => m.Dummy) },
  { path: 'category/:id', loadComponent: () => import('./pages/dummy/dummy').then(m => m.Dummy) },
  { path: 'post/:id', loadComponent: () => import('./pages/dummy/dummy').then(m => m.Dummy) },
  { path: '**', redirectTo: '' },
];
