import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [Button, InputNumberModule, FormsModule, MessagesModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
})
export class BadgeComponent implements OnInit {
  supported = true;
  messages: Message[] = [];
  unreadCount = 24;

  ngOnInit() {
    // Check if the badge is supported
    if (!navigator.setAppBadge || (navigator as any).userAgentData.platform === 'Android') {
      const platform = (navigator as any).userAgentData?.platform ?? 'this platform';

      this.messages = [
        {
          severity: 'error',
          summary: 'Error',
          detail: `Badge is not supported on ${platform}`,
        },
      ];
      this.supported = false;
    }
  }

  async setBadge() {
    // Check Notification permission if iOS
    if (navigator.platform === 'iPhone' || navigator.platform === 'iPad' || navigator.platform === 'iPod') {
      await this.checkNotificationPermission();
    }

    // Set the badge
    navigator.setAppBadge(this.unreadCount).catch((error) => {
      //Do something with the error.
      this.messages = [{ severity: 'error', summary: 'Error', detail: error.toString() }];
    });
  }

  clearBadge() {
    // Clear the badge
    navigator.clearAppBadge().catch((error) => {
      //Do something with the error.
      this.messages = [{ severity: 'error', summary: 'Error', detail: error.toString() }];
    });
  }

  private async checkNotificationPermission() {
    const permissionStatus = await navigator.permissions.query({ name: 'notifications' });

    switch (permissionStatus.state) {
      case 'granted':
        // You can use the Badging API
        this.messages = [{ severity: 'success', summary: 'Permission granted', detail: 'You can use the Badging API' }];
        break;
      case 'denied':
        // The user has denied the permission
        this.messages = [
          {
            severity: 'error',
            summary: 'Permission denied',
            detail: 'You need to grant permission to use the Badging API',
          },
        ];
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
      this.messages = [{ severity: 'success', summary: 'Permission granted', detail: 'You can use the Badging API' }];
    }
  }
}
