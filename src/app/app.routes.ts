import { Routes } from '@angular/router';
import { BadgeComponent } from './pages/badge/badge.component';
import { ContactPickerComponent } from './pages/contact-picker/contact-picker.component';

export const routes: Routes = [
  {
    path: 'badge',
    component: BadgeComponent,
  },
  {
    path: 'contacts',
    component: ContactPickerComponent,
  },
];
