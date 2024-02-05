import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Album } from '../../models/album.interface';
import { Artist } from '../../models/artist.interface';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyKey = 'spotifyAuth'
  spotifyUrl = 'https://api.spotify.com/v1/'
  constructor(private http: HttpClient) { }

  setAuthToken() {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    const token = params.get('access_token')
    const tokenLifeTime = params.get('expires_in')
    if (token && tokenLifeTime) {
      const now = new Date()
      const expireDate = now.setHours(new Date().getHours() + parseInt(tokenLifeTime) / 3600)
      localStorage.setItem(this.spotifyKey, token)
      window.location.hash = ''
      localStorage.setItem('spotifyAuthExpire', new Date(expireDate).toISOString())
    }
  }

  getAuthToken(): string {
    return localStorage.getItem(this.spotifyKey) || ''
  }

  searchArtist(name: string): Observable<Artist[]> {
    return this.http.get<any>(`${this.spotifyUrl}search?q=${encodeURIComponent(name)}&type=artist`).pipe(map(res => res.artists.items))
  }

  searchAlbum(name: string): Observable<Album[]> {
    return this.http.get<any>(`${this.spotifyUrl}search?q=${encodeURIComponent(name)}&type=album`).pipe(map(res => res.albums.items))
  }
}
