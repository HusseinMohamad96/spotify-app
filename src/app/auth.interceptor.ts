import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { SpotifyService } from './core/services/spotify.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(private spotifyService: SpotifyService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.includes('https://api.spotify.com/v1/')) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.spotifyService.getAuthToken()}`,
        }
      })
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl(`${location.origin}/login`)
        }
        return of()
      }))
  }

}   