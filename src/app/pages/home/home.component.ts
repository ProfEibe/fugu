import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

interface Capability {
  name: string;
  available: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, TableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  capabilities: Capability[] = [];

  ngOnInit() {
    this.addCapability('Badging', 'setAppBadge' in navigator);
    this.addCapability('Contacts', 'contacts' in navigator && 'ContactsManager' in window);
    this.addCapability('File System Access', 'showOpenFilePicker' in self);
    this.addCapability('Picture-in-Picture API', 'documentPictureInPicture' in window);
    this.addCapability('Clipboard', 'clipboard' in navigator);
    this.addCapability('HID', 'hid' in navigator);
    this.addCapability('Serial', 'serial' in navigator);
    this.addCapability('WebNFC', 'NDEFReader' in window);
    this.addCapability('WebUSB', 'USB' in window);
    this.addCapability('WebXR', 'xr' in navigator);
    this.addCapability('WebBluetooth', 'bluetooth' in navigator);
    this.addCapability('WebHID', 'hid' in navigator);
    this.addCapability('WebSerial', 'serial' in navigator);
    this.addCapability('WebShare', 'share' in navigator);
  }

  addCapability(name: string, available: boolean) {
    this.capabilities.push({ name, available });
  }
}
