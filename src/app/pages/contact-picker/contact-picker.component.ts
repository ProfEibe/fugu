import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { JsonPipe, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Blob2imgPipe } from './blob2img.pipe';

interface Contact {
  icon: Blob[];
  name: string[];
  email: string[];
  tel: string[];
}

@Component({
  selector: 'app-contact-picker',
  standalone: true,
  imports: [Button, JsonPipe, TableModule, Blob2imgPipe, NgIf],
  templateUrl: './contact-picker.component.html',
  styleUrl: './contact-picker.component.css',
})
export class ContactPickerComponent implements OnInit {
  supported = 'contacts' in navigator && 'ContactsManager' in window;
  api = (navigator as any).contacts || (navigator as any).mozContacts;

  supportedProperties: string[] = [];

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

    const properties = [];
    if (this.supportedProperties.includes('name')) {
      properties.push('name');
    }
    if (this.supportedProperties.includes('email')) {
      properties.push('email');
    }
    if (this.supportedProperties.includes('icon')) {
      properties.push('icon');
    }

    if (this.api?.select) {
      this.contacts = await this.api.select(properties, { multiple: true });
    }
  }
}
