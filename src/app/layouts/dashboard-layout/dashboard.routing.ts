import {Routes} from '@angular/router';
import {DashboardLayoutComponent} from './dashboard-layout.component';
import {IndexLayoutComponent} from './index-layout/index-layout.component';
import {HotelRegisterComponent} from '../hotel-register/hotel-register.component';
import {UserRegiterComponent} from '../user-regiter/user-regiter.component';
import {WelcomeComponent} from '../../welcome/welcome.component';

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
            /* {
              path: 'about',
              component: AboutComponent
            },
            {
              path: 'routing',
              component: RoutingComponent
            },
            {
              path: 'loginMember',
              component: LoginComponent
            },
            {
              path: 'combobox',
              component: ComboBoxComponent
            },
            {
              path: 'detail/:id',
              component: RecipeDetailComponent
            },
            {
              path: 'recipe',
              component: RecipeComponent
            },

            {

              path: 'gallery',
              component: GalleryComponent
            }, {

              path: 'user/info/:id',
              component: UserinforComponent
            },
            {
              path: 'member/info/:id',
              component: MemberinforComponent
            },
            {
              path: 'personal/recipe/:id',
              component: MyrecipeComponent
            },
            {
              path: 'galleryDetail/:id',
              component: GalleryDetailComponent
            },
            {
              path: 'quydinh',
              component: QuyDinhComponent
            }
            ,
            {
              path: 'chinhsachbaomat',
              component: ChinhSachBaoMatComponent
            },
            {
              path: 'chinhsachdiem',
              component: ChinhsachdiemComponent
            },
            {
              path: 'gioithieu',
              component: ServiceComponent
            }
            ,
            {
              path: 'resetPassword',
              component: ForgetPasswordComponent
            },
            {
              path: 'register',
              component: RegisterComponent
            },
            {
              path: 'myGallery',
              component: MygalleryComponent
            }*/
        ]
    }
];
