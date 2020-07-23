import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HotelService} from '../../../shared/service/hotel.service.';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie-service';
import {ChatService} from '../../../shared/service/chat.service';
import {AppSetting} from '../../../appsetting';
import {Title} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {LoginServiceService} from '../../../shared/service/login-service.service';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../../shared/service/user.service.';
import {EventEmitterService} from '../../../shared/service/event-emitter.service';

// @ts-ignore
import moment = require('moment');

@Component({
    selector: 'app-pay-info',
    templateUrl: './pay-info.component.html',
    styleUrls: ['./pay-info.component.css']
})
export class PayInfoComponent implements OnInit {
    formBooking: FormGroup;
    policiesCancelRom: number
    hotelName: string
    numberAmountRoom: string
    roomType: string
    currentRoom: any
    dayBooking = 1;
    ImgHotel = 'default-avatar.png'
    BASE_URL = AppSetting.BASE_SERVER_URL + '/api/images/';
    fromDate = new Date().toLocaleDateString()
    toDate = new Date().toLocaleDateString()
    currentName: string
    currentEmail: string
    currentPhone: string
    roomID: string
    hotelNameSpace: string
    objIdHotel: string
    objUserHotel: string

    errorMessage: String;
    successMessage = '';
    messageObject = {
        objectId: '',
        message: ''
    }


    constructor(private formbuilder: FormBuilder,
                private _hotelService: HotelService,
                private _router: Router,
                private  translate: TranslateService,
                private cookies: CookieService,
                private route: ActivatedRoute,
                private chatService: ChatService,
                private title: Title,
                location: Location,
                private element: ElementRef,
                private router: Router,
                private _loginService: LoginServiceService,
                public dialog: MatDialog,
                private userService: UserService,
                private formBuilder: FormBuilder,
                private cookie: CookieService,
                private emitEventCus: EventEmitterService,
                private hotelService: HotelService
    ) {
        this.currentRoom = []
        this.formBooking = formbuilder.group({
            name: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            hotelNameSpace: [''],
            roomDetailID: [''],
            date: [{begin: new Date(), end: new Date()}],
            totalAmountRoom: [''],
            totalMoney: [''],
            hotelUser: [''],
            hotelObjId: [''],
            status: 0 // 0 book -1 không còn 1 còn 2 đã thanh toán

        });
        this._loginService.testEmail(this.cookies.get('email')).subscribe(data => {
            let user = data.body['user'];
            console.log(user)
            if (user !== undefined) {
                this.currentName = user.name
                this.currentPhone = user.phone
                this.currentEmail = user.email
                this.formBooking.get('name').setValue(user.name)
                this.formBooking.get('phone').setValue(user.phone)
                this.formBooking.get('email').setValue(user.email)

            }
        })
        const paramReq = this.route.snapshot.url[1].path.split('#') // 1 là name-space ks 2 là id Room 3 là số phòng muốn đặt
        this.numberAmountRoom = paramReq[2]
        const idObject = paramReq[0]
        this.roomID = paramReq[1]
        this.hotelNameSpace = paramReq[0]
        this._hotelService.getHotelById(idObject).subscribe(data => {
            const result = data;
            console.log(result)
            this.policiesCancelRom = result[0][0].hotelObj.cancellationPolicy
            this.hotelName = result[0][0].hotelObj.name
            this.ImgHotel = result[0][0].hotelObj.image.split(',', 1)
            this.objIdHotel = result[0][0].hotelObj.user._id
            this.objUserHotel = result[0][0].hotelObj.user.email
            for (let room of result[1][0]) {
                if (room._id === paramReq[1]) {
                    this.currentRoom = room
                }
            }
        })
    }

    dateChange() {
        const range = this.formBooking.value.date;
        if (range) {
            let fromDate = new Date(moment(JSON.stringify(range.begin).split('"')[1]).format('MM/DD/YYYY'))
            let toDate = new Date(moment(JSON.stringify(range.end).split('"')[1]).format('MM/DD/YYYY'))
            this.fromDate = fromDate.toLocaleDateString()
            this.toDate = toDate.toLocaleDateString()
            console.log(fromDate)
            console.log(toDate)
            let Difference_In_Time = toDate.getTime() - fromDate.getTime();
            this.dayBooking = Difference_In_Time / (1000 * 3600 * 24) + 1;
        }
    }

    onSubmit() {
        if (this.formBooking.invalid) {
            this.formBooking.markAllAsTouched()
            const radio: HTMLElement = document.getElementById('scroll-to-top');
            radio.click();
            return
        }

        this.formBooking.get('totalMoney').setValue(this.currentRoom.price * this.dayBooking * this.convertNumber(this.numberAmountRoom))
        this.formBooking.get('roomDetailID').setValue(this.roomID)
        this.formBooking.get('hotelObjId').setValue(this.objIdHotel)
        this.formBooking.get('hotelUser').setValue(this.objUserHotel)
        this.formBooking.get('hotelNameSpace').setValue(this.hotelNameSpace)
        this.formBooking.get('totalAmountRoom').setValue(this.numberAmountRoom)
        console.log(this.objIdHotel)
        this.messageObject.objectId = this.objIdHotel;
        this.messageObject.message = 'Bạn có 1 yêu cầu đặt phòng mới';
        console.log(this.messageObject)
        this._hotelService.bookingHotel(this.formBooking.value).subscribe((data) => {
            const result = data.body
            console.log(result)
            if (result['status'] === 200) {
                // send mess to hotel
                this.chatService.sendNotification(this.messageObject);
                setTimeout(() => {
                    this.chatService.identifyUser();
                }, 1500);

                // phần này là để reload
                this.successMessage = result['message'];
                this.chatService.showNotification('success', this.successMessage);
                setTimeout(() => {
                    this._router.navigate(['/hotel-details/' + this.hotelNameSpace])
                }, 3000);


            } else {
                this.errorMessage = result['message'];
                this.chatService.showNotification('success', this.errorMessage);
            }
        })
    }

    convertNumber(s) {
        return parseInt(s)
    }

    ngOnInit(): void {
    }

    onChangecheck() {
        this.emitEventCus.onCallLogin();
    }

    formatNumber(num) {
        if (num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
    }
}
