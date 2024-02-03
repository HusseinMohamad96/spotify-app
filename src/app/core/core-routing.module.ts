import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';

export const routes: Routes = [
  {
    path: 'browse',
    component: BrowseComponent
  },
  {
    path: '**',
    redirectTo: 'browse'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CoreRoutingModule { }
