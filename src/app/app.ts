import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationComponent } from './shared/notification/notification.component';
import { AuthToastService } from './services/auth-toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificationComponent],
  template: `
    <app-notification></app-notification>
    <router-outlet></router-outlet>
  `,
})
export class App implements OnInit {
  title = 'nexus-commerce';
  private authToast = inject(AuthToastService);

  ngOnInit(): void {
    this.authToast.init();
  }
}
