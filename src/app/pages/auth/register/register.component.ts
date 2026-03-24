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
      this.errorMessage = 'As senhas não coincidem.';
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
      this.errorMessage = 'Erro ao criar conta. O e-mail já pode estar em uso.';
    } finally {
      this.isLoading = false;
    }
  }
}
