import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-clipboard',
  standalone: true,
  imports: [Button],
  templateUrl: './clipboard.component.html',
  styleUrl: './clipboard.component.css',
})
export class ClipboardComponent implements OnInit {
  supported = 'clipboard' in navigator;
  pastedText = '';

  ngOnInit() {
    if (!this.supported) {
      console.log('Clipboard API not available');
      return;
    }

    document.addEventListener('copy', async (e) => {
      e.preventDefault();
      this.copyUrl();
    });

    document.addEventListener('paste', async (e) => {
      e.preventDefault();
      this.pasteText();
    });
  }

  async copyUrl() {
    await navigator.clipboard.writeText(location.href);
  }

  async pasteText() {
    this.pastedText = await navigator.clipboard.readText();
  }
}
