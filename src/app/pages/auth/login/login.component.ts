import { Component, NgZone, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private ns = inject(NotificationService);
  private zone = inject(NgZone);

  loginData = {
    email: '',
    password: '',
    rememberMe: false
  };

  errorMessage = '';
  isLoading = false;

  async onSubmit() {
    if (!this.loginData.email || !this.loginData.password) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    try {
      await this.authService.login(this.loginData.email, this.loginData.password);
      this.zone.run(() => {
        this.router.navigate(['/']);
      });
    } catch (error: any) {
      this.zone.run(() => {
        console.error('Login error:', error);
        const msg = this.authService.getAuthErrorMessage(error);
        this.errorMessage = msg;
        this.ns.show(msg, 'error');
        this.isLoading = false;
      });
    }
  }

  async loginWithGoogle() {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      await this.authService.loginWithGoogle();
      this.zone.run(() => {
        this.router.navigate(['/']);
      });
    } catch (error: any) {
      this.zone.run(() => {
        console.error('Google login error:', error);
        this.errorMessage = 'Failed to login with Google.';
        this.ns.show(this.errorMessage, 'error');
        this.isLoading = false;
      });
    }
  }
}
