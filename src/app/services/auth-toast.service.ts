import { Injectable, inject } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthToastService {
  private auth = inject(Auth);
  private ns = inject(NotificationService);

  private previousUser: User | null | undefined = undefined;

  init(): void {
    authState(this.auth).subscribe(user => {
      if (this.previousUser === undefined) {
        this.previousUser = user;
        return;
      }

      if (user && !this.previousUser) {
        const name = user.displayName || user.email || 'User';
        const photo = user.photoURL;
        this.ns.showAuth(
          `Bem-vindo de volta, <strong>${name}</strong>! 👋`,
          photo,
          'login'
        );
      }

      if (!user && this.previousUser) {
        this.ns.showAuth(
          'Você saiu da sua conta. Até logo! 👋',
          null,
          'logout'
        );
      }

      this.previousUser = user;
    });
  }
}
