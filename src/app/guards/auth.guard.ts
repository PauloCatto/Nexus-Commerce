import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);
  const ns = inject(NotificationService);

  const user = await firstValueFrom(authState(auth));

  if (user) return true;

  ns.show('Faça login para acessar esta página.', 'error');
  return router.createUrlTree(['/login']);
};
