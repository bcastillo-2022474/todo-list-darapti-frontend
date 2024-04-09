import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    /*404*/
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full',
  },
];
