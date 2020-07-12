import {Component, HostListener, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {AppSetting} from '../../../appsetting';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from '@kolkov/ngx-gallery';

@Component({
    selector: 'app-find-hotel',
    templateUrl: './find-hotel.component.html',
    styleUrls: ['./find-hotel.component.css']
})
export class FindHotelComponent implements OnInit {
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    BASE_URL = AppSetting.BASE_SERVER_URL + '/api/images/';
    fixed = false;
    loadding = false;

    constructor(private cookie: CookieService,
    ) {

    }

    ngOnInit(): void {
        this.loadding = true;
        setTimeout(() => {
            this.loadding = false;
        }, 2000);
        const arr = JSON.parse(this.cookie.get('searchText'));
        console.log(arr)

        this.galleryOptions = [
            {
                width: '100%',
                height: '270px',
                thumbnailsColumns: 5,
                // thumbnailsRows: 5,
                imageAnimation: NgxGalleryAnimation.Slide
            },
            // max-width 800
            {
                breakpoint: 400,
                width: '100%',
                height: '500px',
                imagePercent: 25,
                thumbnailsPercent: 5,
                thumbnailsMargin: 5,
                thumbnailMargin: 5
            },
            // max-width 400
            {
                breakpoint: 300,
                preview: false
            }
        ];

        this.galleryImages = [
            {
                small: this.BASE_URL + 'default-avatar-1.png',
                medium: this.BASE_URL + 'default-avatar-1.png',
                big: this.BASE_URL + 'default-avatar-1.png'
            },
            {
                small: this.BASE_URL + 'default-avatar-1.png',
                medium: this.BASE_URL + 'default-avatar-1.png',
                big: this.BASE_URL + 'default-avatar-1.png'
            },
            {
                small: this.BASE_URL + 'default-avatar-1.png',
                medium: this.BASE_URL + 'default-avatar-1.png',
                big: this.BASE_URL + 'default-avatar-1.png'
            },
            {
                small: this.BASE_URL + 'default-avatar-1.png',
                medium: this.BASE_URL + 'default-avatar-1.png',
                big: this.BASE_URL + 'default-avatar-1.png'
            },
            {
                small: this.BASE_URL + 'default-avatar-1.png',
                medium: this.BASE_URL + 'default-avatar-1.png',
                big: this.BASE_URL + 'default-avatar-1.png'
            },
            {
                small: this.BASE_URL + 'default-avatar-1.png',
                medium: this.BASE_URL + 'default-avatar-1.png',
                big: this.BASE_URL + 'default-avatar-1.png'
            },
            {
                small: this.BASE_URL + 'default-avatar-1.png',
                medium: this.BASE_URL + 'default-avatar-1.png',
                big: this.BASE_URL + 'default-avatar-1.png'
            },
            {
                small: this.BASE_URL + 'default-avatar-1.png',
                medium: this.BASE_URL + 'default-avatar-1.png',
                big: this.BASE_URL + 'default-avatar-1.png'
            },
            {
                small: this.BASE_URL + 'default-avatar-1.png',
                medium: this.BASE_URL + 'default-avatar-1.png',
                big: this.BASE_URL + 'default-avatar-1.png'
            },
            {
                small: this.BASE_URL + 'default-avatar-1.png',
                medium: this.BASE_URL + 'default-avatar-1.png',
                big: this.BASE_URL + 'default-avatar-1.png'
            },
        ];
    }

    hehe() {
        console.log('hehe')
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        // console.log(window.scrollY);
        const pos = document.documentElement.scrollTop || document.body.scrollTop;
        const max = document.documentElement.scrollHeight;
        // console.log('pos:' + pos)
        // console.log('max:' + max)
        // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
        if (!this.loadding) {
            if (pos < 600) {
                console.log('scrolling up');
                const element = document.getElementById('left-offer');
                element.setAttribute('class', 'col-lg-3');

                // const element2 = document.getElementById('space');
                // element2.setAttribute('style', 'display:none;');
                // element2.removeAttribute('class');

                const hotelItem = document.getElementById('hotel-item');
                hotelItem.style.marginLeft = '0';
            } else if (pos > 600 && pos < (max - 900)) {
                console.log('scrolling down');
                // tslint:disable-next-line:no-duplicate-variable
                const element = document.getElementById('left-offer');
                element.setAttribute('class', 'fixed-left');

                // const element2 = document.getElementById('space');
                // element2.setAttribute('style', 'display:inline-block; padding: 0 1%');
                // element2.setAttribute('class', 'col-lg-3');

                const hotelItem = document.getElementById('hotel-item');
                hotelItem.style.marginLeft = '25%';
            } else if (pos >= (max - 900)) {
                console.log('scrolling down 1');
                const element = document.getElementById('left-offer');
                element.setAttribute('class', 'col-lg-3');

                // const element2 = document.getElementById('space');
                // element2.setAttribute('style', 'display:none;');
                // element2.removeAttribute('class');

                const hotelItem = document.getElementById('hotel-item');
                hotelItem.style.marginLeft = '0';
            }
        }
    }
}
