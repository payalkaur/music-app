import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-host-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  authService = inject(AuthService)

  ngOnInit() {
    const token = this.authService.getToken()
    window.dispatchEvent(new CustomEvent('auth-token', { detail: token }))
    console.log("dispatched")
  }

}
