import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CardModule} from "primeng/card";
import {AppNavbarComponent} from "./app-navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardModule, AppNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fugu';
}
