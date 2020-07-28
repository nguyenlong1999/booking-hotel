import {Component, OnInit} from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {HotelService} from '../../../shared/service/hotel.service.';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ChatService} from '../../../shared/service/chat.service';
import {AppSetting} from '../../../appsetting';
import {Hotel} from '../../../shared/model/hotel';
import {TranslateService} from '@ngx-translate/core';
import {EventEmitterService} from '../../../shared/service/event-emitter.service';
import {Comment} from '../../../shared/model/comment';


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
    lstFacilitis = []
    lstFacilitisDetails = []
    imageList: any;
    hotel: Hotel;
    lstTienNghiThua = []
    lstTienNghiRoom = []
    lstAddressPopular = [];
    loadding = false;
    commentForm: FormGroup;
    isAuthenicate = false;
    isModeration = false;
    submittedComment = false;
    hotelComment: Comment[] = [];
    lstComment: Comment[];
    valueComment = ''
    totalRating = 0;
    totalPointHotel = 0;

    constructor(private formbuilder: FormBuilder,
                private _hotelService: HotelService,
                private _router: Router,
                private  translate: TranslateService,
                private cookies: CookieService,
                private route: ActivatedRoute,
                private chatService: ChatService,
                private cookie: CookieService,
                private emitEventCus: EventEmitterService
    ) {
    }

    ngOnInit(): void {
        this.loadding = true;
        this.getHotel();
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
        this.commentForm = this.formbuilder.group({
            content: [''],
        });
        this.isModeration = this.cookie.get('role') !== '' ? true : false;
        this.isAuthenicate = this.cookie.get('email') !== '' ? true : false;
    }

    addComment() {
        console.log('theem comment ne')
        const user = this.cookie.get('email');
        this.submittedComment = true;
        if (this.isAuthenicate == false && user === '') {
            this.emitEventCus.onCallLogin();
            return;
        }
        let doneObject = new Object({
            user: user,
            hotel: this.hotel,
            content: this.commentForm.get('content').value
        });
        console.log(doneObject)
        this._hotelService.addComment(doneObject).subscribe(data => {
            const status = data.body['status'];
            console.log(status);
            if (status === 200) {
                let comment: Comment;
                comment = data.body['comment'];
                this.hotelComment.push(comment);
                this.commentForm.get('content').patchValue('');
            }
        })
    }

    get f() {
        return this.commentForm.controls;
    }

    getComent() {
        this.hotelComment.length = 0;
        this._hotelService.getComments().subscribe(data => {
            if (data !== undefined) {
                this.lstComment = data['comments'];
                for (const comment of this.lstComment) {
                    if (comment.hotel.nameSpace == this.hotel.nameSpace) {
                        this.hotelComment.push(comment);
                    }
                }
            }
        });
    }

    getHotel() {
        const idObject = this.route.snapshot.paramMap.get('nameSpace')
        this._hotelService.getHotelById(idObject).subscribe(data => {
            const result = data;
            console.log(result)
            this.hotel = result[0][0].hotelObj
            const valueToRemove = '';
            console.log(result[0][0].hotelObj.image)
            const a = result[0][0].hotelObj.image.split(',');
            this.galleryImages = this.getImage(a.filter(item => item !== valueToRemove))
            this.lstDetaiHotel = result[1][0];
            this.lstFacilitis = result[0][0];
            this.imageList = []
            this.totalRating = result[2];
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
                const lstArraythua = []
                for (let y = 8; y < this.lstFacilitisDetails[i].length; y++) {
                    lstArraythua.push(this.lstFacilitisDetails[i][y])
                }
                this.lstTienNghiThua.push(lstArraythua)
            }
            const country = result[0][0].hotelObj.province.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                .toLocaleLowerCase().split(' ').join('-')
            this.getDuLich(country);
            console.log(this.lstAddressPopular)
            this.getComent();
            this.loadding = false;
        })
    }

    ngAfterInit(): void {
        console.log('xxx')
    }

    async getDuLich(address) {
        console.log('chay toi day')
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + address +
            '+city+point+of+interest&language=en&key=AIzaSyDbIf1-IDfQ0DGaOvAfu5lNZ0bZm0VaisM'; // site that doesn’t send Access-Control-*
        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
            .then(response => response.json())
            .then(contents => this.lstAddressPopular.push(Object(contents.results)))
            .catch(() => console.log('Can’t access ' + url + ' response. Blocked by browser?'))
    }

    payInforRouting(roomId, nameSpace, index) {
        const amount = $('#amount' + index).val()
        console.log(amount)
        if (amount <= 0 || amount === null || amount === '') {
            if (this.translate.currentLang === 'en') {
                $('#errorMessage' + index).html('You must enter a room number greater than 0').show()
            } else {
                $('#errorMessage' + index).html('Bạn phải nhập số phòng lớn hơn 0').show()
            }
            return;
        }
        const param = nameSpace + '#' + roomId + '#' + amount
        console.log(param)
        this._router.navigate(['/booking-room/' + param]);
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

    formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
