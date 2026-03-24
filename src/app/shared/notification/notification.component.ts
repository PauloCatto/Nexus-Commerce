import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private ns: NotificationService) { }

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
