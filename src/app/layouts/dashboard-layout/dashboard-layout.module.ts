import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardLayoutComponent} from './dashboard-layout.component';
import {RouterModule} from '@angular/router';
import {DashBoardRoutes} from './dashboard.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {IndexLayoutComponent} from './index-layout/index-layout.component';
import {HotelRegisterComponent} from '../hotel-register/hotel-register.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {SharedModule} from '../../shared/shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MatDialogModule} from '@angular/material/dialog';
import {UserRegiterComponent} from '../user-regiter/user-regiter.component';
import {ChooseRoomTypeDialogComponent} from '../choose-room-type-dialog/choose-room-type-dialog.component';
import {WelcomeComponent} from '../../welcome/welcome.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {ForgetPasswordComponent} from '../../forget-password/forget-password.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';

import {SatDatepickerModule, SatNativeDateModule} from 'saturn-datepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FindHotelComponent} from './find-hotel/find-hotel.component';
import {HotelDetailsComponent} from './hotel-details/hotel-details.component';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {MatSliderModule} from '@angular/material/slider';
import {PayInfoComponent} from './pay-info/pay-info.component';
import {ViewPayComponent} from '../../view-pay/view-pay.component';
import {QRCodeModule} from 'angularx-qrcode';
import { HistoryBookComponent } from './history-book/history-book.component';

@NgModule({
    declarations: [
        DashboardLayoutComponent,
        IndexLayoutComponent,
        HotelRegisterComponent,
        UserRegiterComponent,
        ChooseRoomTypeDialogComponent,
        WelcomeComponent,
        UserEditComponent,
        ForgetPasswordComponent,
        FindHotelComponent,
        HotelDetailsComponent,
        PayInfoComponent,
        UpgradeComponent,
        ViewPayComponent,
        HistoryBookComponent
        // add các component của trang người dùng vào đây
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        RouterModule.forChild(DashBoardRoutes),
        MatTabsModule,
        MatIconModule,
        MatRadioModule,
        SharedModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        SatDatepickerModule,
        SatNativeDateModule,
        MatDatepickerModule,
        MatDialogModule,
        NgxGalleryModule,
        NgxSkeletonLoaderModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatSliderModule,
        QRCodeModule,

    ],
    providers: [],
    entryComponents: [ChooseRoomTypeDialogComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DashboardLayoutModule {
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
