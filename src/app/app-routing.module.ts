import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { GenreDashboardComponent } from './genre-dashboard/genre-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: DashboardComponent },
  { path: 'show-details/:id', component: ShowDetailsComponent },
  { path: 'genre-dashboard', component: GenreDashboardComponent },
  { path: 'genre-dashboard/:type', component: GenreDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
