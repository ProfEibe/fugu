import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {JsonPipe} from "@angular/common";
import {TableModule} from "primeng/table";

type Contact = {
  icon: Blob[]
  name: string[]
  email: string[]
  tel: string[]
}

@Component({
  selector: 'app-contact-picker',
  standalone: true,
  imports: [
    Button,
    JsonPipe,
    TableModule
  ],
  templateUrl: './contact-picker.component.html',
  styleUrl: './contact-picker.component.css'
})
export class ContactPickerComponent {

  contacts: Contact[] = [];
  imageUrl: string = "";

  async getContacts() {
    const supported = "contacts" in navigator && "ContactsManager" in window;
    if (!supported) {
      console.log("Contacts API not supported");
      return;
    }

    var api = (
      (navigator as any).contacts || (navigator as any).mozContacts
    );
    try {
      this.contacts = await api.select(["name", "email", "icon"], {multiple: true});
      if (this.contacts?.[0].icon[0]) {
        // Display image.
        this.imageUrl = URL.createObjectURL(this.contacts?.[0].icon[0]);
      }
    } catch (ex) {
      console.log(ex);
    }
  }
}
