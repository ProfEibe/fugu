import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { AppNavbarComponent } from './layout/app-navbar.component';
import { ContactPickerComponent } from './pages/contact-picker/contact-picker.component';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardModule, AppNavbarComponent, ContactPickerComponent, Button, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'fugu';

  // Initialize deferredPrompt for use later to show browser install prompt.
  deferredPrompt: any = null;
  hidden = true;

  ngOnInit() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      this.hidden = false;
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);
    });

    window.addEventListener('appinstalled', () => {
      // Hide the app-provided install promotion
      this.hidden = true;
      // Clear the deferredPrompt so it can be garbage collected
      this.deferredPrompt = null;
      // Optionally, send analytics event to indicate successful install
      console.log('PWA was installed');
    });
  }

  async installPwa(): Promise<void> {
    // Hide the app provided install promotion
    this.hidden = true;
    // Show the install prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await this.deferredPrompt.userChoice;
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt and can't use it again, throw it away
    this.deferredPrompt = null;
  }
}
