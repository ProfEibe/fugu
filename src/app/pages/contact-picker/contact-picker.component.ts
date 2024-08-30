import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { JsonPipe, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Blob2imgPipe } from './blob2img.pipe';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

interface Contact {
  icon: Blob[];
  name: string[];
  email: string[];
  tel: string[];
}

@Component({
  selector: 'app-contact-picker',
  standalone: true,
  imports: [Button, JsonPipe, TableModule, Blob2imgPipe, NgIf, CheckboxModule, FormsModule],
  templateUrl: './contact-picker.component.html',
  styleUrl: './contact-picker.component.css',
})
export class ContactPickerComponent implements OnInit {
  supported = 'contacts' in navigator && 'ContactsManager' in window;
  api = (navigator as any).contacts || (navigator as any).mozContacts;

  supportedProperties: string[] = [];
  selectedProperties: string[] = ['name'];

  errorMessage = '';

  contacts: Contact[] = [];

  async ngOnInit() {
    if (this.supported) {
      this.supportedProperties = await this.api.getProperties();
    }
  }

  async getContacts() {
    if (!this.supported) {
      this.errorMessage = 'Contacts API is not supported in this browser.';
    }

    if (this.api?.select) {
      this.contacts = await this.api.select(this.selectedProperties, { multiple: true });
    }
  }
}
