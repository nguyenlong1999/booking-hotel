import {Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {DOCUMENT, Location} from "@angular/common";
import {Subscription} from "rxjs";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  private _router: Subscription;
  @ViewChild(NavbarComponent) navbar: NavbarComponent;

  constructor( private renderer : Renderer2, private router: Router, @Inject(DOCUMENT,) private document: any, private element : ElementRef, public location: Location) {}
  ngOnInit() {
    var navbar : HTMLElement = this.element.nativeElement.children[0].children[0];
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      if (window.outerWidth > 991) {
        window.document.children[0].scrollTop = 0;
      }else{
        window.document.activeElement.scrollTop = 0;
      }
      this.navbar.sidebarClose();

      this.renderer.listen('window', 'scroll', (event) => {
        const number = window.scrollY;
        var _location = this.location.path();
        _location = _location.split('/')[2];

        if (number > 150 || window.pageYOffset > 150) {
          navbar.classList.remove('navbar-transparent');
        } else if (_location !== 'login' && this.location.path() !== '/nucleoicons') {
          // remove logic
          navbar.classList.add('navbar-transparent');
        }
      });
    });
  }
}
