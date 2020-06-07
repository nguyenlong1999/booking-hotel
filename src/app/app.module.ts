import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
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

const config: SocketIoConfig = {url: AppSetting.BASE_SERVER_URL, options: {}};

@NgModule({
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
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
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        // không add các component vào đây
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [CookieService, {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
