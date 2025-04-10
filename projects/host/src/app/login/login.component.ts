import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-host-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  auth = inject(AuthService)
  private router = inject(Router)

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/song-list');
    }
  }
}
