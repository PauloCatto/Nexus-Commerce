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
    <div [@routeAnimations]="getRouteAnimationData()" class="route-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .route-container {
      position: relative;
      min-height: 100vh;
      width: 100%;
    }
  `]
})
export class App implements OnInit {
  title = 'nexus-commerce';
  private authToast = inject(AuthToastService);
  private contexts = inject(ChildrenOutletContexts);

  ngOnInit(): void {
    this.authToast.init();
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
