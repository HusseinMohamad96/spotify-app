import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [HttpClientModule,],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent {

	constructor() { }

	ngOnInit(): void {
		const redirect_uri = 'http://localhost:4200/library/browse';

		const state = this.generateRandomString(16);

		localStorage.setItem("stateKey", state);
		const scope = 'user-read-private user-read-email';
		let url = 'https://accounts.spotify.com/authorize';
		url += '?response_type=token';
		url += '&client_id=' + encodeURIComponent("f6a69a5d8c734dbb80b56688e40b1f36");
		url += '&scope=' + encodeURIComponent(scope);
		url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
		url += '&state=' + encodeURIComponent(state);
		window.location.replace(url);
	}

	generateRandomString(length: number) {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		let counter = 0;
		while (counter < length) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
			counter += 1;
		}
		return result;
	}

}
