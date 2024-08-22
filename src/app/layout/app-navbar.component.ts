import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [Button, RouterLink, MenubarModule, MenuModule],
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css'],
})
export class AppNavbarComponent {
  items: MenuItem[] | undefined;

  constructor() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/',
      },
      {
        label: 'Badge',
        icon: 'pi pi-fw pi-info',
        routerLink: '/badge',
      },
      {
        label: 'Contacts',
        icon: 'pi pi-fw pi-users',
        routerLink: '/contacts',
      },
      {
        label: 'Files',
        icon: 'pi pi-fw pi-file',
        routerLink: '/files',
      },
    ];
  }
}
