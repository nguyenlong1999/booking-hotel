import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Booking} from '../shared/model/booking';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HotelService} from '../shared/service/hotel.service.';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {ChatService} from '../shared/service/chat.service';
import {AbstractControl, FormBuilder} from '@angular/forms';
import {DialogData} from '../user-access/user-access.component';
import {UserService} from '../shared/service/user.service.';
// @ts-ignore
import moment = require('moment');

export interface PeriodicElement {
    name: string;
    dayCount: string;
    status: string;
    roomType: any;
}

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
    readonly formControl: AbstractControl;
    selectListRoomType: string[] = ['Standard', 'Superior', 'Deluxe', 'Suite', 'Family', 'President', 'Royal'];
    selectListStatus: any[] = [
        {title: 'Chờ phản hồi', value: 0},
        {title: 'Đã chấp nhận', value: 1},
        {title: 'Đã thanh toán', value: 2},
        {title: 'Đã từ chối', value: -1},
        {title: 'Đã hủy', value: -2},
    ];
    dataSource: MatTableDataSource<Booking>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['id', 'name', 'roomType', 'fromDate', 'toDate', 'totalAmountRoom', 'status', 'accept', 'refuse', 'view'];
    booking: Booking[] = [];
    hotel: any;
    actionObject = {
        actionName: '',
        booking: Booking
    };
    message = '';
    updateStatusObject = {
        actionName: '',
        idUserBook: '',
        idBooking: '',
        idUserHotel: ''
    }
    errorMessage: String;
    messageObject = {
        objectId: '',
        message: ''
    }

    messageObjectUpdate = {
        objectId: '',
        message: ''
    }
    role: any;
    button = false;

    constructor(
        private hotelService: HotelService,
        private route: Router,
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private cookies: CookieService,
        private chatService: ChatService,
        private userService: UserService
    ) {
        this.formControl = formBuilder.group({
            name: [''],
            dayCount: [''],
            status: [''],
            roomType: ['']
        })
        const email = this.cookies.get('email');
        this.role = parseInt(this.cookies.get('role'))
        this.button = this.role === 2 ? this.button = true : false;
        if (this.role === 2) {
            console.log('ADMIN')
            this.hotelService.getBookingAdmin().subscribe(booking => {
                if (booking === undefined) {
                    return;
                }
                console.log(booking)
                this.booking = booking;
                for (const item of this.booking) {
                    this.hotelService.getHotelById(item.hotelNameSpace).subscribe(hotel => {
                        item.nameHotel = hotel['result'][0][0].hotelObj.name
                        this.hotel = hotel['result']
                        for (const i of hotel['result'][1][0]) {
                            if (i._id === item.roomDetailID) {
                                if (i.roomType === null) {
                                    item.roomType = 'Standard'
                                }
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
                    let fromDate = new Date(new Date(moment(JSON.stringify(item.date.begin).split('"')[1]).format('MM/DD/YYYY')))
                    let toDate = new Date(new Date(moment(JSON.stringify(item.date.end).split('"')[1]).format('MM/DD/YYYY')))
                    let Difference_In_Time = toDate.getTime() - fromDate.getTime();
                    // @ts-ignore
                    item.totalNight = Difference_In_Time / (1000 * 3600 * 24) + 1;
                    if (item.status === '0') {
                        item.status = 'Chờ phản hồi';
                    } else if (item.status === '1') {
                        item.status = 'Đã chấp nhận';
                    } else if (item.status === '2') {
                        item.status = 'Đã thanh toán';
                    } else if (item.status === '-1') {
                        item.status = 'Đã từ chối';
                    } else if (item.status === '-2') {
                        item.status = 'Đã hủy';
                    } else if (item.status === '3') {
                        item.status = 'Đã thanh toán (hủy phòng)';
                    }
                }
                console.log(this.booking)
                this.dataSource = new MatTableDataSource(this.booking)
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.dataSource.filterPredicate = ((data, filter) => {
                    const name = !filter.name || data.name.trim().toLowerCase().includes(filter.name);
                    const dayCount = !filter.dayCount || data.totalAmountRoom === filter.dayCount;
                    const status = !filter.status || data.status === filter.status;
                    const roomType = !filter.roomType || data.roomType === filter.roomType;
                    return name && dayCount && status && roomType;
                }) as (PeriodicElement, string) => boolean;
                this.formControl.valueChanges.subscribe(value => {
                    // console.log(value);
                    const filter = {
                        ...value, name: value.name.trim().toLowerCase(),
                        // dayCount: value.dayCount.trim().toLowerCase()
                        // status: value.status.trim().toLowerCase(),
                        // roomType: value.roomType.trim().toLowerCase()
                    } as string;
                    console.log(filter);
                    this.dataSource.filter = filter;
                });
            });
        } else {
            console.log('CUSTOMER')
            this.hotelService.getBookingByUser(email).subscribe(booking => {
                if (booking === undefined) {
                    return;
                }
                this.booking = booking;
                for (const item of this.booking) {
                    this.hotelService.getHotelById(item.hotelNameSpace).subscribe(hotel => {
                        item.nameHotel = hotel['result'][0][0].hotelObj.name
                        this.hotel = hotel['result']
                        for (const i of hotel['result'][1][0]) {
                            if (i._id === item.roomDetailID) {
                                if (i.roomType === null) {
                                    item.roomType = 'Standard'
                                }
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
                    let fromDate = new Date(new Date(moment(JSON.stringify(item.date.begin).split('"')[1]).format('MM/DD/YYYY')))
                    let toDate = new Date(new Date(moment(JSON.stringify(item.date.end).split('"')[1]).format('MM/DD/YYYY')))
                    let Difference_In_Time = toDate.getTime() - fromDate.getTime();
                    // @ts-ignore
                    item.totalNight = Difference_In_Time / (1000 * 3600 * 24) + 1;
                    if (item.status === '0') {
                        item.status = 'Chờ phản hồi';
                    } else if (item.status === '1') {
                        item.status = 'Đã chấp nhận';
                    } else if (item.status === '2') {
                        item.status = 'Đã thanh toán';
                    } else if (item.status === '-1') {
                        item.status = 'Đã từ chối';
                    } else if (item.status === '-2') {
                        item.status = 'Đã hủy';
                    } else if (item.status === '3') {
                        item.status = 'Đã thanh toán (hủy phòng)';
                    }
                }
                console.log(this.booking)
                this.dataSource = new MatTableDataSource(this.booking)
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.dataSource.filterPredicate = ((data, filter) => {
                    const name = !filter.name || data.name.trim().toLowerCase().includes(filter.name);
                    const dayCount = !filter.dayCount || data.totalAmountRoom === filter.dayCount;
                    const status = !filter.status || data.status === filter.status;
                    const roomType = !filter.roomType || data.roomType === filter.roomType;
                    return name && dayCount && status && roomType;
                }) as (PeriodicElement, string) => boolean;
                this.formControl.valueChanges.subscribe(value => {
                    // console.log(value);
                    const filter = {
                        ...value, name: value.name.trim().toLowerCase(),
                        // dayCount: value.dayCount.trim().toLowerCase()
                        // status: value.status.trim().toLowerCase(),
                        // roomType: value.roomType.trim().toLowerCase()
                    } as string;
                    console.log(filter);
                    this.dataSource.filter = filter;
                });
            });
        }
    }

    ngOnInit(): void {
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
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

    updateStatusBooking(actionName: any, booking: any) {
        console.log('func-updateStatus');
        const idUser = this.cookies.get('ObjectId');
        // const idHotel = hotel._id;
        console.log(booking)
        this.updateStatusObject.idBooking = booking._id
        this.updateStatusObject.idUserBook = booking.email
        this.updateStatusObject.idUserHotel = booking.hotelUser
        this.updateStatusObject.actionName = actionName
        this.hotelService.updateStatusBook(this.updateStatusObject).subscribe(async res => {
            if (res.body['status'] === 200) {
                console.log(res)
                await this.userService.testEmail(res.body['book'].email).subscribe(
                    use => {
                        let user = use.body['user'];
                        if (user !== undefined) {
                            this.messageObject.objectId = use.body['user']._id
                        }
                        // cho thằng use sử dụng mail khác
                        this.messageObjectUpdate.objectId = res.body['book'].userUpdateId;
                        this.messageObjectUpdate.message = res.body['messageUseUpadte']['content'];
                        console.log(this.messageObjectUpdate)
                        this.messageObject.message = res.body['message']['content'];
                        this.message = res.body['messageAdmin']['content'];
                        this.chatService.showNotification('success', this.message);
                        this.chatService.sendNotification(this.messageObject); // send tới thằng đã có mail
                        if (this.messageObjectUpdate.objectId != null && this.messageObjectUpdate.objectId !== ''
                            && this.messageObjectUpdate.objectId !== this.messageObject.objectId) {
                            this.chatService.sendNotification(this.messageObjectUpdate);
                            console.log(this.messageObjectUpdate)
                        }
                        setTimeout(() => {
                            this.message = '';
                            this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                                this.route.navigate(['/bookings']);
                            });
                            this.chatService.identifyUser();
                        }, 1500);
                    })
            } else {
                this.chatService.showNotification('warning', res.body['message']);
            }
        });
    }

    openDialog(booking: any, actionValue: any) {
        this.actionObject.booking = booking;
        if (actionValue === 0 && booking.status === 'Chờ phản hồi') {
            this.actionObject.actionName = 'Chấp nhận';
            this.message = 'Xác nhận khách sạn của bạn còn đủ phòng?';
        } else if (actionValue === 1 && booking.status === 'Chờ phản hồi') {
            this.actionObject.actionName = 'Từ chối';
            this.message = 'Xác nhận khách sạn của bạn hết phòng?';
        }
        console.log(this.message + 'xxxxxx')
        console.log(this.actionObject)
        const dialogRef = this.dialog.open(BookingDialogComponent, {
            width: '500px',
            data: {
                messageDialog: this.message,
                action: this.actionObject
            }
        })

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result) {
                this.updateStatusBooking(result.actionName, result.booking);
            } else {
                console.log('Cancel');
            }
        });
    }

    openDialogView(booking: any) {
        console.log(booking);
        const dialogRef = this.dialog.open(ViewBookingDialogComponent, {
            width: '800px',
            data: {
                action: booking
            }
        })
        dialogRef.afterClosed().subscribe(result => {
            console.log('hehe');
        });
    }
}


@Component({
    selector: 'app-dialog-booking',
    templateUrl: 'dialog-booking.html',
    styleUrls: ['./booking.component.css']
})
export class BookingDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<BookingDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

@Component({
    selector: 'app-dialog-booking-view',
    templateUrl: 'dialog-booking-view.html',
    styleUrls: ['./booking.component.css']
})
export class ViewBookingDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ViewBookingDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    formatNumber(num) {
        if (num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
    }
}
