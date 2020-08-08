import {Routes} from '@angular/router';
import {NoAccessComponent} from './error/no-access/no-access.component';
import {PageNotFoundComponent} from './error/page-not-found/page-not-found.component';

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
    },
    {path: 'no-access', component: NoAccessComponent},
    {path: '**', component: PageNotFoundComponent}
];
