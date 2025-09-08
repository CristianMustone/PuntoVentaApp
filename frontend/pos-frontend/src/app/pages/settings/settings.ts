import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormsModule, NavbarComponent],
  templateUrl: './settings.html',
})
export class Settings {
  logoPreview: string | ArrayBuffer | null = null;

  onLogoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = e => (this.logoPreview = reader.result);
      reader.readAsDataURL(input.files[0]);
    }
  }
}
