import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {MapsComponent} from '../../maps/maps.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {HotelComponentComponent, HotelDialogComponent} from '../../hotel-component/hotel-component.component';
import {BookingComponent} from '../../booking/booking.component';
import {HotelAccessComponent} from '../../hotel-access/hotel-access.component';
import {UserAccessComponent, UserRoleDialog} from '../../user-access/user-access.component';
import {LoginComponent} from './login/login.component';
import {ToastrModule} from 'ngx-toastr';
import {SharedModule} from '../../shared/shared.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {DashboardLayoutModule} from '../dashboard-layout/dashboard-layout.module';
import { HotelUserComponent } from './hotel-user/hotel-user.component';
import { EditUserAdminComponent } from './edit-user-admin/edit-user-admin.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatRippleModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        CommonModule,
        ToastrModule.forRoot(),
        SharedModule,
        MatTabsModule,
        MatIconModule,
        MatRadioModule,
        MatDialogModule,
        SharedModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        MatTableModule,
        MatPaginatorModule,
        DashboardLayoutModule,
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
        HotelDialogComponent,
        BookingComponent,
        HotelAccessComponent,
        UserAccessComponent,
        LoginComponent,
        UserRoleDialog,
        HotelUserComponent,
        EditUserAdminComponent
        // add các component trang admin vào đây
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    entryComponents: [UserAccessComponent, UserRoleDialog, HotelComponentComponent, HotelDialogComponent],
    bootstrap: [UserAccessComponent],
    providers: [
      { provide: MatFormFieldModule, useValue: { appearance: 'fill' } }
    ],
})

export class AdminLayoutModule {
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
