import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {HotelComponentComponent} from '../../hotel-component/hotel-component.component';
import {BookingComponent} from '../../booking/booking.component';
import {HotelAccessComponent} from '../../hotel-access/hotel-access.component';
import {UserAccessComponent} from '../../user-access/user-access.component';

// khai báo component path cho trang admin
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'hotels',        component: HotelComponentComponent },
    { path: 'hotel-access',        component: HotelAccessComponent },
    { path: 'bookings',        component: BookingComponent },
    { path: 'users',        component: UserAccessComponent },
];
