import {Routes} from '@angular/router';
import {DashboardLayoutComponent} from './dashboard-layout.component';
import {IndexLayoutComponent} from './index-layout/index-layout.component';
import {HotelRegisterComponent} from '../hotel-register/hotel-register.component';
import {UserRegiterComponent} from '../user-regiter/user-regiter.component';
import {WelcomeComponent} from '../../welcome/welcome.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {ForgetPasswordComponent} from '../../forget-password/forget-password.component';
import {FindHotelComponent} from './find-hotel/find-hotel.component';
import {HotelDetailsComponent} from './hotel-details/hotel-details.component';
import {PayInfoComponent} from './pay-info/pay-info.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';
import {ViewPayComponent} from '../../view-pay/view-pay.component';
import {HistoryBookComponent} from './history-book/history-book.component';
import {RuleComponent} from '../../rule/rule.component';
import {PolicyComponent} from '../../policy/policy.component';

export const DashBoardRoutes: Routes = [

    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'index',
                pathMatch: 'full'
            },
            {
                path: 'index',
                component: IndexLayoutComponent
            },
            // <= thêm children vào cho trang người dùng
            {
                path: 'booking-hotel',
                component: HotelRegisterComponent
            },
            {
                path: 'user-register',
                component: UserRegiterComponent
            },
            {
                path: 'active/:id',
                component: WelcomeComponent
            },
            {
                path: 'user-info',
                component: UserEditComponent
            },
            {
                path: 'resetPassword',
                component: ForgetPasswordComponent
            },
            {
                path: 'search-hotels',
                component: FindHotelComponent
            },
            {
                path: 'hotel-details/:nameSpace',
                component: HotelDetailsComponent
            },
            {
                path: 'booking-room/:id',
                component: PayInfoComponent
            },
            {
                path: 'pay/:id',
                component: ViewPayComponent
            },
            {
                path: 'about',
                component: UpgradeComponent
            },
            {
                path: 'rule',
                component: RuleComponent
            },
            {
                path: 'policy',
                component: PolicyComponent
            },
            {
                path: 'history-book',
                component: HistoryBookComponent
            }
        ]
    }
];
