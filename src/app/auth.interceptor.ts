import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpotifyService } from './core/services/spotify.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(private spotifyService: SpotifyService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.includes('https://api.spotify.com/v1/')) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.spotifyService.getAuthToken()}`,
        }
      })
    }

    return next.handle(req)
  }

}   