import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {HotelService} from '../../../shared/service/hotel.service.';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ChatService} from '../../../shared/service/chat.service';
import {AppSetting} from '../../../appsetting';
import {Hotel} from '../../../shared/model/hotel';


@Component({
    selector: 'app-hotel-details',
    templateUrl: './hotel-details.component.html',
    styleUrls: ['./hotel-details.component.css']
})

export class HotelDetailsComponent implements OnInit {
    private baseUrl: string = AppSetting.BASE_SERVER_URL;
    galleryOptions: NgxGalleryOptions[]; // imgOfHotel
    galleryImages: NgxGalleryImage[];
    galleryOptions1: NgxGalleryOptions[];
    lstDetaiHotel = []
    lstFacilitisDetails = []
    imageList: any;
    hotel = Hotel;
    lstLocationNear: any
    filterargsStatus = {status: true};
    lstTienNghiThua = new Set(['Danh sách tiện nghi'])
    lstTienNghiRoom = [
        {
            key: 1, name: 'facilities.airConditional', status: true, icon: 'call_to_action'
        },
        {
            key: 2, name: 'facilities.beddingSet', status: true, icon: 'view_sidebar'
        },
        {
            key: 3, name: 'facilities.cableTV', status: true, icon: 'settings_input_antenna'
        },
        {
            key: 4, name: 'facilities.coffe', status: true, icon: 'local_cafe'
        },
        {
            key: 5, name: 'facilities.Dryer', status: true, icon: 'leak_add'
        },
        {
            key: 6, name: 'facilities.Fireplace', status: false, icon: 'web'
        },
        {
            key: 7, name: 'facilities.freeBreakfast', status: false, icon: 'local_cafe'
        },
        {
            key: 8, name: 'facilities.Hairdryer', status: false, icon: 'filter_tilt_shift'
        },
        {
            key: 9, name: 'facilities.heaters', status: true, icon: 'hot_tub'
        },
        {
            key: 10, name: 'facilities.hotTub', status: false, icon: 'hot_tub'
        },
        {
            key: 11, name: 'facilities.ironingMachine', status: true, icon: 'set_meal'
        },
        {
            key: 12, name: 'facilities.privatePool', status: false, icon: 'pool'
        },
        {
            key: 13, name: 'facilities.shampoo', status: true, icon: 'confirmation_number'
        },
        {
            key: 14, name: 'facilities.smartKey', status: true, icon: 'smart_button'
        },
        {
            key: 15, name: 'facilities.tea', status: true, icon: 'transform'
        },
        {
            key: 16, name: 'facilities.teaMaker', status: false, icon: 'surround_sound'
        },
        {
            key: 17, name: 'facilities.televison', status: true, icon: 'tv'
        },
        {
            key: 18, name: 'facilities.TowelsOfAllKinds', status: true, icon: 'view_week'
        },
        {
            key: 19, name: 'facilities.Wardrobe', status: true, icon: 'view_column'
        },
        {
            key: 20, name: 'facilities.workspace', status: false, icon: 'power_input'
        },
        {
            key: 21, name: 'facilities.wifiFree', status: false, icon: 'wifi'
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

    constructor(private formbuilder: FormBuilder,
                private _hotelService: HotelService,
                private _router: Router,
                private cookies: CookieService,
                private route: ActivatedRoute,
                private chatService: ChatService,
    ) {
        const idObject = 'khach-san-cua-long'
        this._hotelService.getHotelById(idObject).subscribe(data => {
            const result = data;
            console.log(result)
            this.hotel = result[0][0].hotelObj
            this.galleryImages = this.getImage(result[0][0].hotelObj.image.split(','))
            this.lstDetaiHotel = result[1][0];
            this.imageList = []
            result[1][0].forEach((roomOrder) => {
                this.imageList.push(this.getImage(roomOrder.lstImg.split(',')))
                // xử lý facilities của từng room
                console.log(roomOrder);
                this.lstTienNghiRoom[0].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[1].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[2].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[3].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[4].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[5].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[6].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[7].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[8].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[9].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[10].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[11].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[12].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[13].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[14].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[15].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[16].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[17].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[18].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[19].status = roomOrder.roomAirConditional;
                this.lstTienNghiRoom[20].status = roomOrder.roomAirConditional;
                this.lstFacilitisDetails.push(this.lstTienNghiRoom)
            })


            // this.lstFacilitisDetails.push()
            // result[1][0].forEach((image) => {
            //     console.log()
            // })

        })

    }

    ngOnInit(): void {

        this.galleryOptions = [
            {
                width: '1200px',
                height: '500px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Rotate
            },
            {
                'imageAutoPlay': true,
                'imageAutoPlayPauseOnHover': true,
                'previewAutoPlay': true,
                'previewAutoPlayPauseOnHover': true
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
        ];

        this.galleryOptions1 = [
            {
                width: '100px',
                height: '100px',
                thumbnailsColumns: 2,
                imageAnimation: NgxGalleryAnimation.Rotate
            },
            {
                imageAutoPlay: true,
                imageAutoPlayPauseOnHover: true,
                previewAutoPlay: true,
                previewAutoPlayPauseOnHover: true
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

    }

    getImage(imgArray) {
        const imageUrls = [];
        for (let i = 0; i < imgArray.length; i++) {
            imageUrls.push({
                small: this.baseUrl + '/api/images/' + imgArray[i],
                medium: this.baseUrl + '/api/images/' + imgArray[i],
                big: this.baseUrl + '/api/images/' + imgArray[i]
            });
        }
        return imageUrls;
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
