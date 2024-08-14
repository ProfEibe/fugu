import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fugu';
}
