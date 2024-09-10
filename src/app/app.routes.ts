import { Routes } from '@angular/router';
import { BadgeComponent } from './pages/badge/badge.component';
import { ContactPickerComponent } from './pages/contact-picker/contact-picker.component';
import { HomeComponent } from './pages/home/home.component';
import { FileAccessComponent } from './pages/file-access/file-access.component';
import { PipComponent } from './pages/pip/pip.component';
import { ClipboardComponent } from './pages/clipboard/clipboard.component';
import { FurtherReadingComponent } from './further-reading/further-reading.component';

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
  {
    path: 'pip',
    component: PipComponent,
  },
  {
    path: 'clipboard',
    component: ClipboardComponent,
  },
  {
    path: 'further-reading',
    component: FurtherReadingComponent,
  },
];
