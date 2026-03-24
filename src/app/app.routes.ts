import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'Home' } },
  { 
    path: 'shop', 
    loadComponent: () => import('./pages/shop/shop').then(m => m.Shop),
    data: { animation: 'Shop' } 
  },
  { 
    path: 'story', 
    loadComponent: () => import('./pages/our-story/our-story').then(m => m.OurStoryComponent),
    data: { animation: 'Story' } 
  },
  { 
    path: 'blog', 
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent),
    data: { animation: 'Blog' } 
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./pages/contact/contact').then(m => m.ContactComponent),
    data: { animation: 'Contact' } 
  },
  { 
    path: 'product/:id', 
    loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetail),
    data: { animation: 'Product' } 
  },
  { 
    path: 'category/:id', 
    loadComponent: () => import('./pages/shop/shop').then(m => m.Shop),
    data: { animation: 'Category' } 
  },
  { 
    path: 'post/:id', 
    loadComponent: () => import('./pages/post-detail/post-detail.component').then(m => m.PostDetailComponent),
    data: { animation: 'Post' } 
  },
  { 
    path: 'cart', 
    loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent), 
    canActivate: [authGuard],
    data: { animation: 'Cart' } 
  },
  { 
    path: 'wishlist', 
    loadComponent: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent), 
    canActivate: [authGuard],
    data: { animation: 'Wishlist' } 
  },
  { 
    path: 'checkout', 
    loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent), 
    canActivate: [authGuard],
    data: { animation: 'Checkout' } 
  },
  { 
    path: 'login', 
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent),
    data: { animation: 'Login' } 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent),
    data: { animation: 'Register' } 
  },
  { 
    path: 'forgot-password', 
    loadComponent: () => import('./pages/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
    data: { animation: 'Forgot' } 
  },
  { 
    path: '**', 
    loadComponent: () => import('./pages/dummy/dummy').then(m => m.Dummy),
    data: { animation: 'NotFound' } 
  },
];
