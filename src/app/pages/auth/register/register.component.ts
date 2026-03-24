import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  registerData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  };

  errorMessage = '';
  isLoading = false;

  async onSubmit() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    
    try {
      await this.authService.register(
        this.registerData.email, 
        this.registerData.password, 
        this.registerData.fullName
      );
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Registration error:', error);
      this.errorMessage = 'Error creating account. The email may already be in use.';
    } finally {
      this.isLoading = false;
    }
  }
}
