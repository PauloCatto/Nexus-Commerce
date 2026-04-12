import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NotificationComponent } from './shared/notification/notification.component';
import { AuthToastService } from './services/auth-toast.service';
import { LoadingService } from './services/loading.service';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { slideInAnimation } from './app.animations';
import { BrandSwapperComponent } from './shared/brand-swapper/brand-swapper.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificationComponent, CommonModule, BrandSwapperComponent, SpinnerComponent],
  animations: [slideInAnimation],
  template: `
    <app-spinner></app-spinner>
    <app-notification></app-notification>
    <div [@routeAnimations]="prepareRoute(outlet)" class="route-container">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
    <app-brand-swapper></app-brand-swapper>
  `,

  styles: [`
    .route-container {
      position: relative;
      width: 100%;
      overflow-x: hidden;
    }
  `]
})
export class App implements OnInit {
  title = 'nexus-commerce';
  private authToast = inject(AuthToastService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  ngOnInit(): void {
    this.authToast.init();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.setLoading(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => this.loadingService.setLoading(false), 300);
      }
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}

