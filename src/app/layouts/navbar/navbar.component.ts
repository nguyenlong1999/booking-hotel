import {Component, OnInit, ElementRef} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-navbar-dashboard',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    private formSearch: FormGroup;
    constructor(
        public location: Location,
        private element: ElementRef,
    ) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        window.addEventListener('wheel', function (event) {
            if (event.deltaY < 0) {
                console.log('scrolling up');
                var element = document.getElementById('check-point');
                element.setAttribute("style", "background-color:none!important;");
                var element1 = document.getElementById('check');
                element1.setAttribute("style", "display: none !important;");
            } else if (event.deltaY > 0) {
                console.log('scrolling down');
                var element = document.getElementById('check-point');
                element.setAttribute("style", "background-color:#f96332!important;");
                var element1 = document.getElementById('check');
                element1.setAttribute("style", "display: block !important;");
            }
        });
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === '/documentation') {
            return true;
        } else {
            return false;
        }
    }
}
