import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-host-callback',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent {
  private route = inject(ActivatedRoute)
  private authService = inject(AuthService)

  ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code')
    if (code) {
      this.authService.exchangeCodeForToken(code);
    }
  }
}
