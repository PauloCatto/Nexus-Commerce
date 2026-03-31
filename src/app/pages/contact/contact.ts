import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { LoadingService } from '../../services/loading.service';
import { NotificationService } from '../../services/notification.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  private fb = inject(FormBuilder);
  private firestore = inject(Firestore);
  public loadingService = inject(LoadingService);
  private notificationService = inject(NotificationService);
  private emailService = inject(EmailService);

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.loadingService.setLoading(true);

      try {
        const formData = this.contactForm.value;

        const contactLog = {
          ...formData,
          to: 'paulohcatto@gmail.com',
          status: 'SENT_TO_EMAILJS',
          timestamp: serverTimestamp()
        };
        await addDoc(collection(this.firestore, 'contact_messages'), contactLog);

        await this.emailService.sendEmail(formData);

        this.notificationService.show('Message sent! I will check it soon.', 'success');
        this.contactForm.reset();
      } catch (error) {
        console.error('Error in contact flow:', error);
        this.notificationService.show('Error sending message. Check your console.', 'error');
      } finally {
        setTimeout(() => this.loadingService.setLoading(false), 500);
      }
    } else {
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
