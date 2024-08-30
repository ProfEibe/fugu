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
  pastedImage = '';

  ngOnInit() {
    if (!this.supported) {
      console.log('Clipboard API not available');
      return;
    }

    document.addEventListener('copy', async (e) => {
      e.preventDefault();
      this.copyFugu();
    });

    document.addEventListener('paste', async (e) => {
      e.preventDefault();
      this.pasteClipboardContent();
    });
  }

  async copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  async copyUrl() {
    await this.copyText(location.href);
  }

  async copyImage(src: string) {
    try {
      const img = await fetch(src); // '/apple-touch-icon.png'
      const blob = await img.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      console.log('Image copied to clipboard', blob.type);
    } catch (err) {
      console.error('Failed to copy image: ', err);
    }
  }

  async copyFugu() {
    await this.copyImage('/apple-touch-icon.png');
  }

  async pasteText() {
    /*const queryOpts: any = { name: 'clipboard-read', allowWithoutGesture: false };
    const permissionStatus = await navigator.permissions.query(queryOpts);
    // Will be 'granted', 'denied' or 'prompt':
    console.log(permissionStatus.state);

    // Listen for changes to the permission state
    permissionStatus.onchange = () => {
      console.log(permissionStatus.state);
    };*/

    try {
      this.pastedText = await navigator.clipboard.readText();
      console.log('Pasted content: ', this.pastedText);
    } catch (err) {
      console.error('Failed to paste: ', err);
    }
  }

  async pasteClipboardContent() {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          const blob = await clipboardItem.getType(type);
          this.pastedImage = URL.createObjectURL(blob);
        }
      }
    } catch (err: any) {
      console.error(err.name, err.message);
    }
  }
}
