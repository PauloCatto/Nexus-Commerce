import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, ChildrenOutletContexts } from '@angular/router';
import { NotificationComponent } from './shared/notification/notification.component';
import { AuthToastService } from './services/auth-toast.service';
import { CommonModule } from '@angular/common';
import { slideInAnimation } from './app.animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificationComponent, CommonModule],
  animations: [slideInAnimation],
  template: `
    <app-notification></app-notification>
    <div [@routeAnimations]="prepareRoute(outlet)" class="route-container">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
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

  ngOnInit(): void {
    this.authToast.init();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
