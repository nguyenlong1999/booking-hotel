import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
// thêm menu trang admin
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
  { path: '/table-list', title: 'Table List', icon: 'content_paste', class: '' },
  { path: '/typography', title: 'Typography', icon: 'library_books', class: '' },
  { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  { path: '/hotels', title: 'Hotel', icon: 'house', class: '' },
  { path: '/users', title: 'User', icon: 'person', class: '' },
  { path: '/bookings', title: 'Bookings', icon: 'book', class: '' },
  // <= thêm tiếp vào đây

];
// thêm menu cho phân quyền tài khoản khách sạn
export const ROUTES_HOTEL: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/user-hotels', title: 'Hotel', icon: 'house', class: '' },
  { path: '/bookings', title: 'Bookings', icon: 'book', class: '' },
  // <= thêm tiếp vào đây
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    if (this.cookieService.get('role') === '2') {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    } else {
      this.menuItems = ROUTES_HOTEL.filter(menuItem => menuItem);
    }

  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
