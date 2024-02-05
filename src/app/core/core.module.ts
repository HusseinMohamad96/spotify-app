import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddArtistComponent } from './add-artist/add-artist.component';
import { BrowseComponent } from './browse/browse.component';
import { CoreRoutingModule } from './core-routing.module';
import { SpotifyService } from './services/spotify.service';
import { SpotifyRepository } from './spotify.repository';


@NgModule({
  declarations: [BrowseComponent, AddArtistComponent],
  providers: [SpotifyService, SpotifyRepository],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatProgressSpinnerModule
  ],
  exports: [BrowseComponent, AddArtistComponent]
})
export class CoreModule { }
