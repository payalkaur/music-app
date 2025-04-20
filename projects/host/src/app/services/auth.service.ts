import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private router = inject(Router)

  private clientId = environment.SPOTIFY_CLIENT_ID // your spotify clientId //'1d72f3b148f24fec80d9ba7d774df1cf'; //process.env['SPOTIFY_CLIENT_ID']
  private redirectUrl = 'http://localhost:4200/callback'
  private authorizationUrl = "https://accounts.spotify.com/authorize"
  private tokenUrl = "https://accounts.spotify.com/api/token"

  // public accessToken: string | null = null

  isAuthenticatedUser() {
    const token = localStorage.getItem('access_token')
    const expiry = localStorage.getItem('expires_at')

    return token && expiry && Date.now() < +expiry
  }

  async login() {
    // Code for generating code verifier
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");

    const code_verifier = randomString;
    const data = new TextEncoder().encode(code_verifier);
    const hashed = await crypto.subtle.digest('SHA-256', data);

    // Code for generating code  challenge
    const code_challenge = btoa(String.fromCharCode(...new Uint8Array(hashed)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    localStorage.setItem('code_verifier', code_verifier)

    const scope = 'user-read-private user-read-email'

    const authUrl = `${this.authorizationUrl}?` +
      `client_id=${this.clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(this.redirectUrl)}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&code_challenge_method=S256` +
      `&code_challenge=${code_challenge}`

    window.location.href = authUrl // Redirect the user to the authorization server for login
  }

  // Function returns auth token
  exchangeCodeForToken(code: string) {
    const code_verifier = localStorage.getItem('code_verifier');
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', this.redirectUrl)
      .set('client_id', this.clientId)
      .set('code_verifier', code_verifier!);

    return this.http.post<any>(this.tokenUrl, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).subscribe(response => {
      this.storeToken(response.access_token, response.expires_in);
      this.router.navigateByUrl('/home');
    });
  }

  storeToken(token: string, expiresIn: number) {
    const expiryTime = Date.now() + expiresIn * 1000; // milliseconds
    localStorage.setItem('access_token', token);
    localStorage.setItem('expires_at', expiryTime.toString());
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('code_verifier');
    this.router.navigateByUrl('/login');
  }
}