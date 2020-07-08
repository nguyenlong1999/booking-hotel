import {Component, OnInit} from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from '@kolkov/ngx-gallery';

@Component({
    selector: 'app-hotel-details',
    templateUrl: './hotel-details.component.html',
    styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    constructor() {
    }

    ngOnInit(): void {
        this.galleryOptions = [
            {
                width: '600px',
                height: '400px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide
            },
            // max-width 800
            {
                breakpoint: 800,
                width: '100%',
                height: '600px',
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            },
            // max-width 400
            {
                breakpoint: 400,
                preview: false
            }
        ];

        this.galleryImages = [
            {
                small: 'assets/img/500_F_271970300_UIGOT5pqS08ymy5U2cXTB73Z7lWASGMm.jpg',
                medium: 'assets/img/1616895.jpg',
                big: 'assets/img/1993652.jpg'
            },
            {
                small: 'assets/img/26049717.jpg',
                medium: 'assets/img/76247377-reception-in-hostel-visitors-with-luggage-and-new-keys-.jpg',
                big: 'assets/img/109970629-happy-group-of-teen-and-family-traveler-vector-illustration-cartoon-character-.jpg'
            },
            {
                small: 'assets/img/26049717.jpg',
                medium: 'assets/img/76247377-reception-in-hostel-visitors-with-luggage-and-new-keys-.jpg',
                big: 'assets/img/109970629-happy-group-of-teen-and-family-traveler-vector-illustration-cartoon-character-.jpg'
            },
            {
                small: 'assets/img/26049717.jpg',
                medium: 'assets/img/76247377-reception-in-hostel-visitors-with-luggage-and-new-keys-.jpg',
                big: 'assets/img/109970629-happy-group-of-teen-and-family-traveler-vector-illustration-cartoon-character-.jpg'
            },
            {
                small: 'assets/img/26049717.jpg',
                medium: 'assets/img/76247377-reception-in-hostel-visitors-with-luggage-and-new-keys-.jpg',
                big: 'assets/img/109970629-happy-group-of-teen-and-family-traveler-vector-illustration-cartoon-character-.jpg'
            },
        ];
    }

}
