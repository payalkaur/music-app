import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'song-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  token: string | null = null;

  ngOnInit() {
    console.log("called")
    // Listen for the custom event dispatched by host
    // window.addEventListener('auth-token', this.handleAuthToken);

    window.addEventListener(
      'auth-token',
      (e) => {
        (e as CustomEvent).detail
        console.log((e as CustomEvent).detail)
      },
      false,
    );
  }

  // handleAuthToken = (event: Event) => {
  //   const customEvent = event as CustomEvent;
  //   this.token = customEvent.detail;
  //   console.log('Received token in song list:', this.token);
  // };

  ngOnDestroy() {
    // window.removeEventListener('auth-token', this.handleAuthToken);
  }

  //-----------------------

  //   songs: any[] = [];
  //   loading = true;

  //   constructor(private http: HttpClient, public auth: AuthService, private router: Router) { }

  //   ngOnInit() {
  //     if (!this.auth.isLoggedIn()) {
  //       this.router.navigateByUrl('/');
  //       return;
  //     }

  //     const headers = new HttpHeaders({
  //       Authorization: `Bearer ${this.auth.accessToken}`
  //     });

  //     // Replace with any public playlist or track IDs
  //     const trackIds = ['3n3Ppam7vgaVa1iaRUc9Lp', '7ouMYWpwJ422jRcDASZB7P'];

  //     this.http.get(`https://api.spotify.com/v1/tracks?ids=${trackIds.join(',')}`, { headers })
  //       .subscribe({
  //         next: (res: any) => {
  //           this.songs = res.tracks;
  //           this.loading = false;
  //         },
  //         error: (err) => {
  //           console.error(err);
  //           if (err.status === 401) {
  //             this.auth.logout();
  //           }
  //         }
  //       });
  //   }

  sendEvent() {
    const event = new CustomEvent('changeText', {
      detail: {
        text: 'Hello from Song list'
      }
    })

    dispatchEvent(event)
  }

}

