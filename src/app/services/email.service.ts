import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private config = environment.emailjs;

  async sendEmail(formData: any) {
    try {
      const templateParams = {
        name: formData.name,
        message: formData.message,
        time: new Date().toLocaleString(),
        reply_to: formData.email,
        subject: formData.subject
      };

      const response = await emailjs.send(
        this.config.serviceID,
        this.config.templateID,
        templateParams,
        this.config.publicKey
      );

      return response;
    } catch (error) {
      console.error('EmailJS Error:', error);
      throw error;
    }
  }
}
