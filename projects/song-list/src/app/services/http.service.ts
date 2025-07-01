import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../host/src/environments/environment.prod';
import { Albums } from '../interfaces/Album';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient)

  constructor() { }

  fetchNewReleases() {
    this.http.get<Albums>(`${environment.SPOTIFY_WEB_API_URL}/browse/new-releases`)
  }
}
