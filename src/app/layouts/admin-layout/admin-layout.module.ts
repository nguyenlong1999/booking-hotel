import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { HotelComponentComponent } from '../../hotel-component/hotel-component.component';
import { BookingComponent } from '../../booking/booking.component';
import { HotelAccessComponent } from '../../hotel-access/hotel-access.component';
import { UserAccessComponent } from '../../user-access/user-access.component';
import { LoginComponent } from './login/login.component';
import {FileSelectDirective} from "ng2-file-upload";
import {ToastrModule} from "ngx-toastr";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        CommonModule,
        ToastrModule.forRoot(),
        SharedModule,
    ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    HotelComponentComponent,
    BookingComponent,
    HotelAccessComponent,
    UserAccessComponent,
    LoginComponent,
    FileSelectDirective
    // add các component trang admin vào đây
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})

export class AdminLayoutModule { }
