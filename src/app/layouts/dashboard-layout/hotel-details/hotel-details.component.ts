import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from '@kolkov/ngx-gallery';

@Component({
    selector: 'app-hotel-details',
    templateUrl: './hotel-details.component.html',
    styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    galleryOptions1: NgxGalleryOptions[];
    galleryImages1: NgxGalleryImage[];

    nameHotel = ' hotel cuar long dz';
    filterargsStatus = {status: true};
    lstTienNghiRoom = [
        {
            key: 1, name: 'Máy điều hòa', status: false, icon: 'call_to_action'
        },
        {
            key: 2, name: 'Máy sấy tóc', status: false, icon: 'filter_tilt_shift'
        },
        {
            key: 3, name: 'Máy sưởi', status: true, icon: 'hot_tub'
        },
        {
            key: 4, name: 'Tivi', status: true, icon: 'tv'
        },
        {
            key: 5, name: 'Truyền hình cáp', status: true, icon: 'settings_input_antenna'
        },
        {
            key: 6, name: 'Trà', status: true, icon: 'transform'
        },
        {
            key: 7, name: 'Cà phê', status: true, icon: 'local_cafe'
        },
        {
            key: 8, name: 'Dầu gội đầu', status: true, icon: 'confirmation_number'
        },
        {
            key: 9, name: 'Bộ ga giường', status: true, icon: 'view_sidebar'
        },
        {
            key: 9, name: 'Khăn các loại', status: false, icon: 'view_week'
        },
        {
            key: 10, name: 'Tủ áo', status: false, icon: 'view_column'
        },
        {
            key: 11, name: 'Máy sấy', status: false, icon: 'leak_add'
        },
        {
            key: 12, name: 'Máy ủi (bàn là)', status: false, icon: 'set_meal'
        },
        {
            key: 13, name: 'Chìa khóa thông minh', status: false, icon: 'smart_button'
        },
        {
            key: 14, name: 'Máy pha cà phê/trà', status: false, icon: 'surround_sound'
        },
        {
            key: 15, name: 'Ăn sáng miễn phí', status: false, icon: 'local_cafe'
        },
        {
            key: 16, name: 'Hồ bơi riêng', status: false, icon: 'pool'
        },
        {
            key: 17, name: 'Bàn/không gian làm việc', status: false, icon: 'power_input'
        },
        {
            key: 18, name: 'Lò sưởi trong nhà', status: false, icon: 'web'
        },
        {
            key: 19, name: 'Bồn tắm nước nóng', status: false, icon: 'hot_tub'
        }

    ]

    lstAddressPopular = [
        {
            name: 'Đường Phạm Ngũ Lão ', km: 400
        },
        {
            name: 'Ben Thanh Market', km: 830
        },
        {
            name: 'Dinh Độc Lập', km: 870
        },
        {
            name: 'Bảo tàng Chứng tích Chiến tranh', km: 890
        },
        {
            name: 'Quảng trường Hồ Chí Minh ', km: 620
        },
        {
            name: 'Bưu điện Trung tâm Thành phố', km: 250
        },
        {
            name: 'Chợ Lớn', km: 200
        },
        {
            name: 'Chùa Giác Lâm', km: 250
        }
    ]

    constructor() {
    }

    ngOnInit(): void {
        this.galleryOptions = [
            {
                width: '800px',
                height: '500px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Rotate
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

        this.galleryOptions1 = [
            {
                width: '250px',
                height: '200px',
                thumbnailsColumns: 2,
                imageAnimation: NgxGalleryAnimation.Rotate
            },
            // max-width 800
            {
                breakpoint: 200,
                width: '100%',
                height: '150px',
                imagePercent: 80,
                thumbnailsPercent: 100,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            },
            // max-width 400
            {
                breakpoint: 400,
                preview: true
            }
        ];

        this.galleryImages1 = [
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

@Pipe({
    name: 'filterByStatus',
    pure: false
})
export class FilterStatusPipe implements PipeTransform {
    transform(items: any[], filter: Object): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.status === true);
    }
}
