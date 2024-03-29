import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpotifyRepository } from '../spotify.repository';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrl: './add-artist.component.css'
})
export class AddArtistComponent {
  registerForm: FormGroup = new FormGroup({})

  constructor(private fb: FormBuilder, private spotifyRepo: SpotifyRepository) { }

  ngOnInit() {
    this.buildForm()
  }

  get albums() {
    return this.registerForm.controls["albums"] as FormArray;
  }

  getSongs(index: number): FormArray {
    const control = this.albums.controls[index]
    return control.get("songs") as FormArray;
  }

  getAlbums() {
    return this.registerForm.controls["albums"] as FormArray;
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      dob: ['', [Validators.required, this.ageValidator(25)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?961\d{8}$/)]], // Lebanese phone number regex
      profilePicture: [''],
      stageName: [''],
      artistBackstory: [''],
      startingDate: [''],
      albums: this.fb.array([])
    });
  }

  addAlbum(event: Event): void {
    event?.preventDefault()
    const albumForm = this.fb.group({
      picture: [''],
      date: [''],
      songs: this.fb.array([])
    })
    this.albums.push(albumForm)
  }

  addSong(index: number, event: Event) {
    event?.preventDefault()
    const songForm = this.fb.group({
      name: [''],
      duration: ['']
    })
    this.getSongs(index).push(songForm)
  }

  getAsFormGroup(control: any): FormGroup<any> {
    return control as FormGroup<any>
  }

  onSubmit() {
    this.spotifyRepo.addArtist(this.registerForm.value)
    console.log(this.registerForm.value)
  }

  showError(controlName: string): boolean {
    const control = this.registerForm.controls[controlName]
    return control.invalid && (control.dirty || control.touched)
  }

  hasError(control: string, error: string): boolean {
    return this.registerForm.controls[control].hasError(error)
  }

  private ageValidator(minAge: number) {
    return (control: FormControl) => {
      if (control.value) {
        const dob = new Date(control.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        if (age < minAge) {
          return { ageError: { requiredAge: minAge } };
        }
      }
      return null;
    };
  }

}
