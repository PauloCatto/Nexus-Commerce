import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  email: string = '';
  isSubmitted: boolean = false;

  constructor(private ns: NotificationService) {}

  onSubmit() {
    console.log('Reset request for:', this.email);
    this.isSubmitted = true;
    this.ns.show('Recovery link sent to your email.', 'info');
  }
}
