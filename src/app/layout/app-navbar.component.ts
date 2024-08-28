import { Component, OnDestroy, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import PocketBase from 'pocketbase';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [Button, RouterLink, MenubarModule, MenuModule],
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css'],
})
export class AppNavbarComponent implements OnInit, OnDestroy {
  pb = new PocketBase('https://fugu.jakobs.io');
  items: MenuItem[] | undefined;

  async ngOnInit() {
    await this.pb.collection('menu').subscribe('*', async () => {
      this.loadMenu();
    });

    this.loadMenu();
  }

  loadMenu() {
    this.pb
      .collection('menu')
      .getFullList<{ label: string; icon: string; routerLink: string; active: boolean; order: number }>()
      .then((menu) => {
        this.items = menu.filter((i) => i.active).sort((a, b) => a.order - b.order);
      });
  }

  async ngOnDestroy() {
    await this.pb.collection('menu').unsubscribe();
  }
}
