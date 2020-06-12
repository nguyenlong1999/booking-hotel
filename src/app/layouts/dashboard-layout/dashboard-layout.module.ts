import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import {RouterModule} from '@angular/router';
import {DashBoardRoutes} from './dashboard.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import { IndexLayoutComponent } from './index-layout/index-layout.component';

@NgModule({
  declarations: [
      DashboardLayoutComponent,
      IndexLayoutComponent
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
  ]
})
export class DashboardLayoutModule { }
