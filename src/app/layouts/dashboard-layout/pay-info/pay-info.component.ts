import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HotelService} from '../../../shared/service/hotel.service.';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie-service';
import {ChatService} from '../../../shared/service/chat.service';

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
    currentRoom = []
    dayBooking = 1;
    constructor(private formbuilder: FormBuilder,
                private _hotelService: HotelService,
                private _router: Router,
                private  translate: TranslateService,
                private cookies: CookieService,
                private route: ActivatedRoute,
                private chatService: ChatService) {
        this.formBooking = formbuilder.group({
            date: [{begin: new Date(), end: new Date()}]
        });
        const paramReq = this.route.snapshot.url[1].path.split('#') // 1 là name-space ks 2 là id Room 3 là số phòng muốn đặt
        this.numberAmountRoom = paramReq[2]
        const idObject = paramReq[0]
        this._hotelService.getHotelById(idObject).subscribe(data => {
            const result = data;
            this.policiesCancelRom = result[0][0].hotelObj.cancellationPolicy
            this.hotelName = result[0][0].hotelObj.name
            for (let room of result[1][0]) {
                if (room._id === paramReq[1]) {
                    this.currentRoom = room
                }
            }
            console.log(this.currentRoom)
        })
    }

    dateChange() {

        const range = this.formBooking.value.date;
        if (range) {
            let fromDate = new Date(moment(JSON.stringify(range.begin).split('"')[1]).format('MM/DD/YYYY'))
            let toDate =  new Date(moment(JSON.stringify(range.end).split('"')[1]).format('MM/DD/YYYY'))
            console.log(fromDate)
            console.log(toDate)
            let Difference_In_Time = toDate.getTime() - fromDate.getTime();
            this.dayBooking = Difference_In_Time / (1000 * 3600 * 24) + 1;
        }
    }

    onSubmit() {
        console.log('hehe')
    }
    convertNumber(s) {
        return parseInt(s)
    }
    ngOnInit(): void {
    }

}
