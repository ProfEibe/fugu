import { Routes } from '@angular/router';
import { BadgeComponent } from './pages/badge/badge.component';
import { ContactPickerComponent } from './pages/contact-picker/contact-picker.component';
import { HomeComponent } from './pages/home/home.component';
import { FileAccessComponent } from './pages/file-access/file-access.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'badge',
    component: BadgeComponent,
  },
  {
    path: 'contacts',
    component: ContactPickerComponent,
  },
  {
    path: 'files',
    component: FileAccessComponent,
  },
];
