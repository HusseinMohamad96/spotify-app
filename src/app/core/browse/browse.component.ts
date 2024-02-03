import { Component } from '@angular/core';
import { take } from 'rxjs';
import { Album } from '../../models/album.interface';
import { Artist } from '../../models/artist.interface';
import { SpotifyService } from '../services/spotify.service';

@Component({
	selector: 'app-browse',
	standalone: false,
	templateUrl: './browse.component.html',
	styleUrl: './browse.component.css'
})
export class BrowseComponent {

	artistName = 'iron maiden'
	artists: Artist[] = [];
	albums: Album[] = []

	constructor(private spotifyService: SpotifyService) { }

	ngOnInit() {
		this.spotifyService.setAuthToken()
	}

	searchArtist() {
		this.spotifyService.searchArtist(this.artistName).pipe(take(1)).subscribe(res => {
			this.albums = []
			this.artists = res
		})
	}

	searchAlbums(artist: string) {
		this.spotifyService.searchAlbum(artist).pipe(take(1)).subscribe(res => {
			this.albums = res

		})
	}

	getStarRating(rating: number): string[] {
		return new Array(Math.max(1, Math.round(rating / 20))).fill('')
	}

	goBackToArtists(): void {
		this.albums = []
	}
}
