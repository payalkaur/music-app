import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'song-details',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  text = "initial text"

  constructor() {
    window.addEventListener('changeText', (e: any) => {
      this.text = e.detail.text
    })
  }
}
