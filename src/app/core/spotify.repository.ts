import { createStore } from '@ngneat/elf';
import { addEntities, selectAllEntities, setEntities, updateEntities, withEntities } from '@ngneat/elf-entities';
import { Artist } from '../models/artist.interface';


const store = createStore({ name: 'spotify' }, withEntities<Artist>());

export class SpotifyRepository {
  spotify$ = store.pipe(selectAllEntities());

  setArtist(spotify: Artist[]) {
    store.update(setEntities(spotify));
  }

  addArtist(spotify: Artist) {
    store.update(addEntities(spotify));
  }

  updateArtist(id: Artist['id'], spotify: Partial<Artist>) {
    store.update(updateEntities(id, spotify));
  }
}
