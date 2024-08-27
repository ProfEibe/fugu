import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [Button, InputNumberModule, FormsModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
})
export class BadgeComponent {
  unreadCount = 24;
  message = '';

  async setBadge() {
    // Check if the badge is supported
    if (!('setAppBadge' in navigator)) {
      console.log('Badge is not supported');
      return;
    }

    // Check Notification permission if iOS
    if (navigator.platform === 'iPhone' || navigator.platform === 'iPad' || navigator.platform === 'iPod') {
      await this.checkNotificationPermission();
    }

    // Set the badge
    navigator.setAppBadge(this.unreadCount).catch((error) => {
      //Do something with the error.
      this.message = error.toString();
    });
  }

  clearBadge() {
    // Clear the badge
    navigator.clearAppBadge().catch((error) => {
      //Do something with the error.
    });
  }

  private async checkNotificationPermission() {
    const permissionStatus = await navigator.permissions.query({ name: 'notifications' });

    switch (permissionStatus.state) {
      case 'granted':
        // You can use the Badging API
        this.message = 'Permission granted';
        break;
      case 'denied':
        // The user has denied the permission
        this.message = 'Permission denied';
        break;
      default:
        // The user has not yet granted or denied the permission
        await this.requestNotificationPermission();
        break;
    }
  }

  private async requestNotificationPermission() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // You can now use the Badging API
      this.message = 'Permission granted';
    }
  }
}
