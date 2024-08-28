import { Component, OnDestroy, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import PocketBase from 'pocketbase';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { JsonPipe, KeyValuePipe } from '@angular/common';

interface Survey {
  antwort3: boolean;
  antwort1: boolean;
  antwort2: boolean;
}

@Component({
  selector: 'app-pip',
  standalone: true,
  imports: [Button, CheckboxModule, FormsModule, ProgressBarModule, JsonPipe, KeyValuePipe],
  templateUrl: './pip.component.html',
  styleUrl: './pip.component.css',
})
export class PipComponent implements OnInit, OnDestroy {
  pb = new PocketBase('https://fugu.jakobs.io');

  bar1 = 0;
  bar2 = 0;
  bar3 = 0;
  total = 0;

  recordId: string | null = null;

  data: Survey = {
    antwort1: false,
    antwort2: false,
    antwort3: false,
  };

  async ngOnInit() {
    this.recordId = localStorage.getItem('recordId');
    if (this.recordId) {
      this.pb
        .collection('umfrage')
        .getOne<Survey>(this.recordId)
        .then((data) => {
          this.data = data;
        })
        .catch(() => {
          localStorage.removeItem('recordId');
          this.recordId = null;
        });
    }
    this.getData();

    await this.pb.collection('umfrage').subscribe('*', () => {
      this.getData();
    });
  }

  async ngOnDestroy() {
    await this.pb.collection('umfrage').unsubscribe();
  }

  async openPip() {
    const container = document.querySelector('#content');

    const pipWindow = await (window as any).documentPictureInPicture.requestWindow();

    pipWindow.document.body.append(container);

    this.copyStyles(pipWindow);

    // Move the player back when the Picture-in-Picture window closes.
    pipWindow.addEventListener('pagehide', (event: any) => {
      const container = document.querySelector('#content-container');
      const content = event.target.querySelector('#content');
      container!.append(content);
    });
  }

  private getData() {
    this.pb
      .collection('umfrage')
      .getFullList<Survey>()
      .then((data) => {
        // calculate the percentage of each answer
        const total = data.length;
        const antworten = data.reduce(
          (acc, { antwort1, antwort2, antwort3 }) => {
            if (antwort1) {
              acc.antwort1++;
            }
            if (antwort2) {
              acc.antwort2++;
            }
            if (antwort3) {
              acc.antwort3++;
            }

            return acc;
          },
          {
            antwort1: 0,
            antwort2: 0,
            antwort3: 0,
          },
        );

        this.bar1 = (antworten.antwort1 / total) * 100;
        this.bar2 = (antworten.antwort2 / total) * 100;
        this.bar3 = (antworten.antwort3 / total) * 100;
        this.total = total;
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

  async update() {
    if (this.recordId) {
      await this.pb.collection('umfrage').update(this.recordId, this.data);
    } else {
      const foo = await this.pb.collection('umfrage').create(this.data);
      this.recordId = foo.id;
      localStorage.setItem('recordId', foo.id);
    }
  }
}
