import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

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
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Login error:', error);
      this.errorMessage = 'Invalid credentials. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  async loginWithGoogle() {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      await this.authService.loginWithGoogle();
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Google login error:', error);
      this.errorMessage = 'Failed to login with Google.';
    } finally {
      this.isLoading = false;
    }
  }
}
