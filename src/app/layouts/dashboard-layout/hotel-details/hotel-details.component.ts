import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {HotelService} from '../../../shared/service/hotel.service.';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ChatService} from '../../../shared/service/chat.service';
import {AppSetting} from '../../../appsetting';
import {Hotel} from '../../../shared/model/hotel';
import {formatNumber} from '@angular/common';


@Component({
    selector: 'app-hotel-details',
    templateUrl: './hotel-details.component.html',
    styleUrls: ['./hotel-details.component.css']
})

export class HotelDetailsComponent implements OnInit {
    Object = Object
    Array = Array
    private baseUrl: string = AppSetting.BASE_SERVER_URL;
    galleryOptions: NgxGalleryOptions[]; // imgOfHotel
    galleryImages: NgxGalleryImage[];
    galleryOptions1: NgxGalleryOptions[];
    lstDetaiHotel = []
    lstBedRoomDetails = []
    lstFacilitis = []
    lstFacilitisDetails = []
    imageList: any;
    hotel = Hotel;
    lstTienNghiThua = []
    lstTienNghiRoom = []
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
            this.lstFacilitis = result[0][0];
            this.imageList = []
            result[1][0].forEach((roomOrder) => {
                this.imageList.push(this.getImage(roomOrder.lstImg.split(',')))
                // xử lý facilities của từng room
                this.lstTienNghiRoom = []
                this.lstTienNghiRoom.push({name: 'facilities.airConditional', status: roomOrder.roomAirConditional, icon: 'call_to_action'})
                this.lstTienNghiRoom.push({name: 'facilities.beddingSet', status: roomOrder.roomBeddingSet, icon: 'view_sidebar'})
                this.lstTienNghiRoom.push({name: 'facilities.cableTV', status: roomOrder.roomCableTV, icon: 'settings_input_antenna'})
                this.lstTienNghiRoom.push({name: 'facilities.coffe', status: roomOrder.roomCoffee, icon: 'local_cafe'})
                this.lstTienNghiRoom.push({name: 'facilities.Dryer', status: roomOrder.roomDryer, icon: 'leak_add'})
                this.lstTienNghiRoom.push({name: 'facilities.Fireplace', status: roomOrder.roomFireplace, icon: 'web'})
                this.lstTienNghiRoom.push({name: 'facilities.freeBreakfast', status: roomOrder.roomFreeBreakfast, icon: 'local_cafe'})
                this.lstTienNghiRoom.push({name: 'facilities.freeWifi', status: roomOrder.roomFreeWifi, icon: 'wifi'})
                this.lstTienNghiRoom.push({name: 'facilities.Hairdryer', status: roomOrder.roomHairdryer, icon: 'filter_tilt_shift'})
                this.lstTienNghiRoom.push({name: 'facilities.heaters', status: roomOrder.roomHeaters, icon: 'hot_tub'})
                this.lstTienNghiRoom.push({name: 'facilities.hotTub', status: roomOrder.roomHotTub, icon: 'hot_tub'})
                this.lstTienNghiRoom.push({name: 'facilities.ironingMachine', status: roomOrder.roomIroningMachine, icon: 'set_meal'})
                this.lstTienNghiRoom.push({name: 'facilities.privatePool', status: roomOrder.roomPrivatePool, icon: 'pool'})
                this.lstTienNghiRoom.push({name: 'facilities.shampoo', status: roomOrder.roomShampoo, icon: 'confirmation_number'})
                this.lstTienNghiRoom.push({name: 'facilities.smartKey', status: roomOrder.roomSmartKey, icon: 'smart_button'})
                this.lstTienNghiRoom.push({name: 'facilities.tea', status: roomOrder.roomTea, icon: 'transform'})
                this.lstTienNghiRoom.push({name: 'facilities.teaMaker', status: roomOrder.roomTeaMaker, icon: 'surround_sound'})
                this.lstTienNghiRoom.push({name: 'facilities.televison', status: roomOrder.roomTelevison, icon: 'tv'})
                this.lstTienNghiRoom.push({name: 'facilities.TowelsOfAllKinds', status: roomOrder.roomTowelsOfAllKinds, icon: 'view_week'})
                this.lstTienNghiRoom.push({name: 'facilities.Wardrobe', status: roomOrder.roomWardrobe, icon: 'view_column'})
                this.lstTienNghiRoom.push({name: 'facilities.workspace', status: roomOrder.roomWorkspace, icon: 'power_input'})
                this.lstFacilitisDetails.push(this.lstTienNghiRoom.filter(function (obj) {
                    return obj.status === true // push all status  true
                }))
            })
            for (let i = 0; i < this.lstFacilitisDetails.length; i++) {
                let lstArraythua = []
                for (let y = 8; y < this.lstFacilitisDetails[i].length; y++) {
                    lstArraythua.push(this.lstFacilitisDetails[i][y])
                }
                this.lstTienNghiThua.push(lstArraythua)
            }
            console.log(this.lstDetaiHotel)
            // this.lstBedRoomDetails.push()
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

    ngAfterInit(): void {
        console.log('xxx')

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

    convertNumber(s) {
        return parseInt(s)
    }
}


// @Pipe({
//     name: 'filterByStatus',
//     pure: false
// })
// export class FilterStatusPipe implements PipeTransform {
//     transform(items: any[], filter: Object): any {
//         if (!items || !filter) {
//             return items;
//         }
//         // filter items array, items which match and return true will be
//         // kept, false will be filtered out
//         return items.filter(item => item.status === true);
//     }
// }
