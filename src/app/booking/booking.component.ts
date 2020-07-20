import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Hotel} from '../shared/model/hotel';
import {Booking} from '../shared/model/booking';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HotelService} from '../shared/service/hotel.service.';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {ChatService} from '../shared/service/chat.service';
// @ts-ignore
import moment = require('moment');

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

    dataSource: MatTableDataSource<Booking>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['id', 'name', 'roomType', 'fromDate', 'toDate', 'totalAmountRoom', 'status', 'accept', 'refuse'];
    booking: Booking[] = [];
    hotel: any

    constructor(
        private hotelService: HotelService,
        private route: Router,
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private cookies: CookieService,
        private chatService: ChatService
    ) {
        const email = this.cookies.get('email');
        this.hotelService.getBookingByUser(email).subscribe(booking => {
            // console.log(hotels);
            if (booking === undefined) {
                return;
            }
            console.log(booking)
            this.booking = booking;


            for (const item of this.booking) {
                console.log(item)
                console.log(item.date.begin)
                this.hotelService.getHotelById(item.hotelNameSpace).subscribe(hotel => {
                    item.name = hotel[0][0].hotelObj.name
                    this.hotel = hotel
                    for (const i of hotel[1][0]) {
                        if (i._id === item.roomDetailID) {
                            if (i.roomType === 1) {
                                item.roomType = 'Standard'
                            }
                            if (i.roomType === 2) {
                                item.roomType = 'Superior'
                            }
                            if (i.roomType === 3) {
                                item.roomType = 'Deluxe'
                            }
                            if (i.roomType === 4) {
                                item.roomType = 'Suite'
                            }
                            if (i.roomType === 5) {
                                item.roomType = 'Family'
                            }
                            if (i.roomType === 6) {
                                item.roomType = 'President'
                            }
                            if (i.roomType === 7) {
                                item.roomType = 'Royal'
                            }
                        }
                    }
                })
                item.fromDate = new Date(moment(JSON.stringify(item.date.begin).split('"')[1]).format('MM/DD/YYYY')).toLocaleDateString()
                item.toDate = new Date(moment(JSON.stringify(item.date.end).split('"')[1]).format('MM/DD/YYYY')).toLocaleDateString()

                if (item.status === '0') {
                    item.status = 'Chờ phản hồi';
                } else if (item.status === '1') {
                    item.status = 'Còn phòng';
                } else if (item.status === '2') {
                    item.status = 'Đã thanh toán';
                }
            }
            this.dataSource = new MatTableDataSource(this.booking)
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            // this.dataSource.filterPredicate = ((data, filter) => {
            //     // console.log(data);
            //     const name = !filter.name || data.name.trim().toLowerCase().includes(filter.name);
            //     const email = !filter.email || data.user.email.trim().toLowerCase().includes(filter.email);
            //     const address = !filter.address || data.address.trim().toLowerCase().includes(filter.address);
            //     const status = !filter.status || data.status === filter.status;
            //     const starHotel = !filter.starHotel || data.starHotel === filter.starHotel;
            //     return name && email && address && status && starHotel;
            // }) as (PeriodicElement, string) => boolean;
            // this.formControl.valueChanges.subscribe(value => {
            //     const filter = {...value, name: value.name.trim().toLowerCase()} as string;
            //     // console.log(filter);
            //     this.dataSource.filter = filter;
            // });
        });
    }

    ngOnInit(): void {
    }

    openPayMent() {
        let url = 'http://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder';
        let popUp = window.open(url, 'MsgWindow', 'width=1000,height=800');
        var timer = setInterval(
            function checkChild() {
                if (popUp.closed) {
                    alert('Child window closed');
                    clearInterval(timer);
                }
            }, 500);
    }
}
