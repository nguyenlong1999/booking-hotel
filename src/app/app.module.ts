import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {AppComponent} from './app.component';
import {AppRoutes} from './app.routing';
import {AppSetting} from './appsetting';
import {ComponentsModule} from './components/components.module';
import {ErrorModule} from './error/error.module';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {DashboardLayoutModule} from './layouts/dashboard-layout/dashboard-layout.module';
import {JwtInterceptor} from './shared/helper';
import {SharedModule} from './shared/shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {MAT_DIALOG_DEFAULT_OPTIONS} from "@angular/material/dialog";

const config: SocketIoConfig = {url: AppSetting.BASE_SERVER_URL, options: {}};

@NgModule({
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        CommonModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        ComponentsModule,
        RouterModule,
        RouterModule.forRoot(AppRoutes, { onSameUrlNavigation: 'reload' }),
        ErrorModule,
        SharedModule,
        SocketIoModule.forRoot(config),
        DashboardLayoutModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        NgbModule,
        NgxDaterangepickerMd.forRoot(),
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        // không add các component vào đây
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},CookieService, {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
