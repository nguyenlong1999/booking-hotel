import {Routes} from '@angular/router';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {HotelComponentComponent} from '../../hotel-component/hotel-component.component';
import {BookingComponent} from '../../booking/booking.component';
import {HotelAccessComponent} from '../../hotel-access/hotel-access.component';
import {UserAccessComponent} from '../../user-access/user-access.component';
import {AdminLayoutComponent} from './admin-layout.component';
import {AuthGuardGuard} from '../../shared/guards/AuthGuard/auth-guard.guard';
import {LoginComponent} from './login/login.component';
import {UserRegisterComponent} from 'app/user-register/user-register.component';
import {HotelUserComponent} from './hotel-user/hotel-user.component';
import {EditUserAdminComponent} from './edit-user-admin/edit-user-admin.component';
import {DashboardComponent} from '../../dashboard/dashboard.component';

// khai báo component path cho trang admin
export const AdminLayoutRoutes: Routes = [
    {path: 'admin', redirectTo: '/login', pathMatch: 'full'},
    {
        path: '', component: AdminLayoutComponent,
        canActivate: [AuthGuardGuard], // <- this line is added
        children: [
            {
                path: '',
                redirectTo: 'hotels',
                pathMatch: 'full'
            },
            {path: 'user-edit', component: EditUserAdminComponent},
            {path: 'dashboard', component: DashboardComponent},
            // {path: 'user-profile', component: UserProfileComponent},
            {path: 'user-profile', component: UserProfileComponent},
            // {path: 'table-list', component: TableListComponent},
            // {path: 'typography', component: TypographyComponent},
            // {path: 'icons', component: IconsComponent},
            // {path: 'maps', component: MapsComponent},
            // {path: 'notifications', component: NotificationsComponent},
            {path: 'hotels', component: HotelComponentComponent},
            {path: 'hotel-access', component: HotelAccessComponent},
            {path: 'hotelEdit/:id', component: HotelAccessComponent},
            {path: 'bookings', component: BookingComponent},
            {path: 'users', component: UserAccessComponent},
            {path: 'user-register', component: UserRegisterComponent},
            {path: 'user-hotels', component: HotelUserComponent}
        ]
    },
    {path: 'login', component: LoginComponent},
];
