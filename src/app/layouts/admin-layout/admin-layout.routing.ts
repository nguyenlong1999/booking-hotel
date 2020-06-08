import {Routes} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {MapsComponent} from '../../maps/maps.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';
import {HotelComponentComponent} from '../../hotel-component/hotel-component.component';
import {BookingComponent} from '../../booking/booking.component';
import {HotelAccessComponent} from '../../hotel-access/hotel-access.component';
import {UserAccessComponent} from '../../user-access/user-access.component';
import {AdminLayoutComponent} from './admin-layout.component';
import {AuthGuardGuard} from '../../shared/guards/AuthGuard/auth-guard.guard';
import {LoginComponent} from './login/login.component';

// khai báo component path cho trang admin
export const AdminLayoutRoutes: Routes = [
    {path: 'admin', redirectTo: '/login', pathMatch: 'full'},

    // {
    //     path: 'station',
    //     component: StationComponent
    // },
    {
        path: '', component: AdminLayoutComponent,
        canActivate: [AuthGuardGuard], // <- this line is added
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {path: 'dashboard', component: DashboardComponent},
            {path: 'user-profile', component: UserProfileComponent},
            {path: 'table-list', component: TableListComponent},
            {path: 'typography', component: TypographyComponent},
            {path: 'icons', component: IconsComponent},
            {path: 'maps', component: MapsComponent},
            {path: 'notifications', component: NotificationsComponent},
            {path: 'upgrade', component: UpgradeComponent},
            {path: 'hotels', component: HotelComponentComponent},
            {path: 'hotel-access', component: HotelAccessComponent},
            {path: 'bookings', component: BookingComponent},
            {path: 'users', component: UserAccessComponent},
        ]
    },
    {path: 'login', component: LoginComponent},
];
