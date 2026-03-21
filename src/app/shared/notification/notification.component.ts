import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification-container">
      <div *ngFor="let n of notifications; trackBy: trackById" 
           class="toast" [class]="n.type">
        <div class="toast-content">
          <span class="material-icons icon">{{ n.type === 'success' ? 'check_circle' : n.type === 'error' ? 'error' : 'info' }}</span>
          <p class="message">{{ n.message }}</p>
          <button class="close-toast-btn" (click)="remove(n.id)">
            <span class="material-icons">close</span>
          </button>
        </div>
        <div class="progress-bar"></div>
      </div>
    </div>
  `,
  styles: [`
    .notification-container {
      position: fixed;
      top: 2rem;
      right: 2rem;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      pointer-events: none;
    }
    .toast {
      pointer-events: auto;
      min-width: 300px;
      padding: 1rem 1.5rem;
      border-radius: 16px;
      background: rgba(10, 15, 26, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      cursor: pointer;
      animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
        background: rgba(139, 92, 246, 0.1);
        border-color: rgba(139, 92, 246, 0.4);
      }
    }
    .toast-content {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 1;
    }
    .close-toast-btn {
      margin-left: auto;
      background: transparent;
      border: none;
      color: rgba(255, 255, 255, 0.4);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      padding: 0.25rem;
      border-radius: 6px;
      
      &:hover {
        color: #fff;
        background: rgba(255, 255, 255, 0.1);
      }
      
      .material-icons {
        font-size: 1.15rem;
      }
    }
    .icon {
      font-size: 1.5rem;
      &.success { color: #10b981; }
      &.error { color: #ef4444; }
      &.info { color: #3b82f6; }
    }
    .success .icon { color: #10b981; }
    .error .icon { color: #ef4444; }
    .info .icon { color: #3b82f6; }
    
    .message {
      color: #fff;
      font-weight: 500;
      margin: 0;
    }
    .progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: var(--primary-color);
      width: 100%;
      animation: progress 3s linear forwards;
    }
    @keyframes slideIn {
      from { transform: translateX(200px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes progress {
      from { width: 100%; }
      to { width: 0%; }
    }
  `]
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private ns: NotificationService) {}

  ngOnInit() {
    this.ns.notifications$.subscribe(n => this.notifications = n);
  }

  remove(id: number) {
    this.ns.remove(id);
  }

  trackById(index: number, n: Notification) {
    return n.id;
  }
}
