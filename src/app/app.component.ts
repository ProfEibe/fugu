import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { AppNavbarComponent } from './layout/app-navbar.component';
import { ContactPickerComponent } from './pages/contact-picker/contact-picker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardModule, AppNavbarComponent, ContactPickerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'fugu';
}
