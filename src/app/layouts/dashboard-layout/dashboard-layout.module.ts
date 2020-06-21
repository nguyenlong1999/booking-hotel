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
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {ScrollTopComponent} from "../../shared/animation/scroll-top/scroll-top.component";

@NgModule({
    declarations: [
        DashboardLayoutComponent,
        IndexLayoutComponent,
        HotelRegisterComponent,
        ScrollTopComponent
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
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    providers: [
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class DashboardLayoutModule {
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
