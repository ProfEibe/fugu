import { Component, ElementRef, viewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { JsonPipe, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-pip',
  standalone: true,
  imports: [Button, CheckboxModule, FormsModule, ProgressBarModule, JsonPipe, KeyValuePipe],
  templateUrl: './pip.component.html',
  styleUrl: './pip.component.css',
})
export class PipComponent {
  supported = 'documentPictureInPicture' in window;
  content = viewChild<ElementRef>('content');

  async openPip() {
    const pipWindow = await (window as any).documentPictureInPicture.requestWindow();

    pipWindow.document.body.append(this.content()?.nativeElement);

    this.copyStyles(pipWindow);

    // Move the player back when the Picture-in-Picture window closes.
    pipWindow.addEventListener('pagehide', (event: any) => {
      const container = document.querySelector('#content-container');
      const content = event.target.querySelector('#content');
      container!.append(content);
    });
  }

  private copyStyles(pipWindow: Window) {
    // Copy style sheets over from the initial document
    // so that the player looks the same.
    [...(document.styleSheets as any)].forEach((styleSheet) => {
      try {
        const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
        const style = document.createElement('style');

        style.textContent = cssRules;
        pipWindow.document.head.appendChild(style);
      } catch (e) {
        const link = document.createElement('link');

        link.rel = 'stylesheet';
        link.type = styleSheet.type;
        link.media = styleSheet.media;
        link.href = styleSheet.href;
        pipWindow.document.head.appendChild(link);
      }
    });
  }
}
