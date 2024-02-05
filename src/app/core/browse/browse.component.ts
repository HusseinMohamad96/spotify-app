import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, take, takeUntil, tap } from 'rxjs';
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

	searchQuery = new FormControl('')
	artists: Artist[] = [];
	albums: Album[] = []
	selectedArtist = ''
	unsubscribe$ = new Subject()
	loading = false
	constructor(private spotifyService: SpotifyService) { }

	ngOnInit() {
		this.spotifyService.setAuthToken()
		this.typeAheadSearch()
	}

	searchArtist(search: string = this.searchQuery.value || '') {
		if (!search) {
			return
		}
		this.loading = true
		this.spotifyService.searchArtist(search).pipe(
			tap(() => this.loading = false),
			take(1)
		).subscribe(res => {
			this.albums = []
			this.artists = res
		})
	}

	searchAlbums(artist: string) {
		this.loading = true
		this.selectedArtist = artist
		this.spotifyService.searchAlbum(artist).pipe(
			tap(() => this.loading = false),
			take(1)
		).subscribe(res => {
			this.albums = res

		})
	}

	getStarRating(rating: number): string[] {
		return new Array(Math.max(1, Math.round(rating / 20))).fill('')
	}

	goBackToArtists(): void {
		this.albums = []
	}

	typeAheadSearch(): void {
		this.searchQuery.valueChanges.pipe(
			debounceTime(500),
			distinctUntilChanged(),
			takeUntil(this.unsubscribe$)
		).subscribe(res => {
			if (res) {
				this.searchArtist(res)
			}
		})
	}

	ngOnDestroy() {
		this.unsubscribe$.next('')
		this.unsubscribe$.complete()
	}
}
