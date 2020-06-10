import {NgModule} from '@angular/core';
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
import {NavbarComponent} from "../navbar/navbar.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { NouisliderModule } from 'ng2-nouislider';
import {JwBootstrapSwitchNg2Module} from 'jw-bootstrap-switch-ng2';
import {AgmCoreModule} from '@agm/core';

import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {MatDialogModule} from "@angular/material/dialog";
import {DialogSearchComponent} from "../dialog-search/dialog-search.component";

@NgModule({
    declarations: [
        DashboardLayoutComponent,
        IndexLayoutComponent,
        NavbarComponent,
        DialogSearchComponent
        // add các component của trang người dùng vào đây
    ],
    imports: [
        NgbModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        // NouisliderModule,
        MatDialogModule,
        AgmCoreModule,
        JwBootstrapSwitchNg2Module,
        RouterModule.forChild(DashBoardRoutes),
        NgxDaterangepickerMd,
    ],
    entryComponents:[DialogSearchComponent]
})
export class DashboardLayoutModule {
}
