import {Component, OnInit} from '@angular/core';
import {Booking} from '../../../shared/model/booking';
import {HotelService} from '../../../shared/service/hotel.service.';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {ChatService} from '../../../shared/service/chat.service';
import {UserService} from '../../../shared/service/user.service.';
import {AppSetting} from '../../../appsetting';
// @ts-ignore
import moment = require('moment');

@Component({
    selector: 'app-history-book',
    templateUrl: './history-book.component.html',
    styleUrls: ['./history-book.component.css']
})
export class HistoryBookComponent implements OnInit {
    booking: Booking[] = [];
    BASE_URL = AppSetting.BASE_SERVER_URL + '/api/images/';

    constructor(
        private _hotelService: HotelService,
        private route: Router,
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private cookies: CookieService,
        private chatService: ChatService,
        private userService: UserService
    ) {
        const userCurrent = this.cookies.get('ObjectId');
        this._hotelService.getBookingByUserRegister(userCurrent).subscribe(booking => {
            if (booking === undefined) {
                return;
            }
            this.booking = booking;
            for (let book of this.booking) {
                console.log(book.hotelNameSpace)
                this._hotelService.getHotelById(book.hotelNameSpace).subscribe(data => {
                    const result = data;
                    console.log(result)
                    book.nameHotel = result[0][0].hotelObj.name
                    book.policiesCancelRom = result[0][0].hotelObj.cancellationPolicy
                    book.ImgHotel = result[0][0].hotelObj.image.split(',', 1).toString()
                    book.address = result[0][0].hotelObj.address
                    book.fromDate = new Date(moment(JSON.stringify(book.date.begin).split('"')[1])
                        .format('MM/DD/YYYY')).toLocaleDateString()
                    book.toDate = new Date(moment(JSON.stringify(book.date.end).split('"')[1])
                        .format('MM/DD/YYYY')).toLocaleDateString()
                    for (const i of result[1][0]) {
                        if (i._id === book.roomDetailID) {
                            if (i.roomType === null) {
                                book.roomType = 'Standard'
                            }
                            if (i.roomType === 1) {
                                book.roomType = 'Standard'
                            }
                            if (i.roomType === 2) {
                                book.roomType = 'Superior'
                            }
                            if (i.roomType === 3) {
                                book.roomType = 'Deluxe'
                            }
                            if (i.roomType === 4) {
                                book.roomType = 'Suite'
                            }
                            if (i.roomType === 5) {
                                book.roomType = 'Family'
                            }
                            if (i.roomType === 6) {
                                book.roomType = 'President'
                            }
                            if (i.roomType === 7) {
                                book.roomType = 'Royal'
                            }
                        }
                    }
                })

            }
            console.log(this.booking)
        })
    }

    ngOnInit(): void {
    }

    pay(book) {
        console.log('thanh toán nè')
        console.log(book)
        const money = book.totalMoney.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'VND'
        this.route.navigate(['/pay/' + book._id + '#' + money]);
    }

}
