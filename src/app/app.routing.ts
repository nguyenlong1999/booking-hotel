import { Routes } from '@angular/router';
export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: './layouts/dashboard-layout/dashboard-layout.module#DashboardLayoutModule'
  },
  {
    path: '',
    loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }
];
