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

  async setBadge() {
    if (!('setAppBadge' in navigator)) {
      console.log('Badge is not supported');
      return;
    }
    // Set the badge
    navigator.setAppBadge(this.unreadCount);
  }

  clearBadge() {
    // Clear the badge
    navigator.clearAppBadge();
  }
}
