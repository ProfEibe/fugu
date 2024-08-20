import { Routes } from '@angular/router';
import { BadgeComponent } from './apis/badge/badge.component';
import { ContactPickerComponent } from './apis/contact-picker/contact-picker.component';

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
