import {Component, Inject, OnInit} from '@angular/core';
import {Booking} from '../../../shared/model/booking';
import {HotelService} from '../../../shared/service/hotel.service.';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {ChatService} from '../../../shared/service/chat.service';
import {UserService} from '../../../shared/service/user.service.';
import {AppSetting} from '../../../appsetting';
import {DialogData} from '../../../user-access/user-access.component';
import {StarRatingColor} from '../../../shared/animation/star-rating/star-rating.component';
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
    updateStatusObject = {
        actionName: '',
        idUserBook: '',
        idBooking: '',
        idUserHotel: ''
    }

    updateRatingObject = {
        hotelId: '',
        idBook: '',
        rating: 0
    }
    message = '';

    errorMessage: String;
    messageObject = {
        objectId: '',
        message: ''
    }
    rating = 0;
    starCount = 5;
    starColor: StarRatingColor = StarRatingColor.accent;
    starColorP: StarRatingColor = StarRatingColor.primary;
    starColorW: StarRatingColor = StarRatingColor.warn;
    starColorX: StarRatingColor = StarRatingColor.warning;


    constructor(
        private _hotelService: HotelService,
        private route: Router,
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private cookies: CookieService,
        private chatService: ChatService,
        private userService: UserService
    ) {
        this.getInitHotel()
    }

    ngOnInit(): void {
    }

    getInitHotel() {
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
                                book.roomType = 'Tiêu chuẩn'
                            }
                            if (i.roomType === 1) {
                                book.roomType = 'Tiêu chuẩn'
                            }
                            if (i.roomType === 2) {
                                book.roomType = 'View đẹp'
                            }
                            if (i.roomType === 3) {
                                book.roomType = 'Cao cấp'
                            }
                            if (i.roomType === 4) {
                                book.roomType = 'Siêu sang'
                            }
                            if (i.roomType === 5) {
                                book.roomType = 'Phòng đôi'
                            }
                            if (i.roomType === 6) {
                                book.roomType = 'Tổng thống'
                            }
                            if (i.roomType === 7) {
                                book.roomType = 'Hoàng gia'
                            }
                        }
                    }
                })

            }
            console.log(this.booking)
        })
    }

    onRatingChanged(rating, book) {
        this.rating = rating;
        this.updateRatingObject.hotelId = book.hotelNameSpace
        this.updateRatingObject.idBook = book._id
        this.updateRatingObject.rating = this.rating
        this._hotelService.updateRatingBook(this.updateRatingObject).subscribe(async res => {
            this.chatService.showNotification('success', res.body['message']);
            this.getInitHotel()
        })
    }

    cancelRoom(book) {
        if (book.status == 0 || book.status == 1) { // cấm sửa ===
            console.log(book.status)
            this.updateStatusObject.actionName = 'Hủy phòng'
            this.updateStatusObject.idBooking = book._id
            console.log(this.updateStatusObject)
            console.log('Hủy phòng nè')
            this._hotelService.updateStatusBook(this.updateStatusObject).subscribe(async res => {
                if (res.body['status'] === 200) {
                    await this.userService.testEmail(res.body['hotelUSe']).subscribe(
                        use => {
                            console.log(res);
                            let user = use.body['user'];
                            if (user !== undefined) {
                                this.messageObject.objectId = use.body['user']._id
                            }
                            this.messageObject.message = res.body['messageAdmin']['content'];
                            this.message = res.body['message']['content'];
                            this.chatService.showNotification('success', this.message);
                            //  this.chatService.sendNotification(this.messageObject);
                            // console.log(this.messageObject.message)
                            setTimeout(() => {
                                this.message = '';
                                this.chatService.identifyUser();
                                window.location.reload()
                                // this.router.navigate(['/index'])
                            }, 1500);
                        })
                } else {
                    this.chatService.showNotification('warning', res.body['message']);
                }
            })
        } else {
            // console.log('Thanh toán xog tôi hủy phòng nè')
            const dialogRef = this.dialog.open(PayCancelDialogComponent, {
                width: '500px',
                data: {
                    data: book
                }
            })
            dialogRef.afterClosed().subscribe(result => {
                console.log(result);
                if (result) {
                    this.updateStatusObject.actionName = 'Pay Cancel'
                    this.updateStatusObject.idBooking = book._id
                    this._hotelService.updateStatusBook(this.updateStatusObject).subscribe(async res => {
                        if (res.body['status'] === 200) {
                            await this.userService.testEmail(res.body['hotelUSe']).subscribe(
                                use => {
                                    console.log(res);
                                    let user = use.body['user'];
                                    if (user !== undefined) {
                                        this.messageObject.objectId = use.body['user']._id
                                    }
                                    this.messageObject.message = res.body['messageAdmin']['content'];
                                    this.message = res.body['message']['content'];
                                    this.chatService.showNotification('success', this.message);
                                    this.chatService.sendNotification(this.messageObject);
                                    console.log(this.messageObject.message)
                                    setTimeout(() => {
                                        this.message = '';
                                        this.chatService.identifyUser();
                                        window.location.reload()
                                        // this._router.navigate(['/index'])
                                    }, 1500);
                                })
                        } else {
                            this.chatService.showNotification('warning', res.body['message']);
                        }
                    })
                } else {
                    console.log('Cancel');
                }
            });
        }
    }

    pay(book) {
        const dialogRef = this.dialog.open(PayDialogComponent, {
            width: '500px',
            data: {
                data: book
            }
        })

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result) {
                this.updateStatusObject.actionName = 'Thanh toán'
                this.updateStatusObject.idBooking = book._id
                this._hotelService.updateStatusBook(this.updateStatusObject).subscribe(async res => {
                    if (res.body['status'] === 200) {
                        await this.userService.testEmail(res.body['hotelUSe']).subscribe(
                            use => {
                                console.log(res);
                                let user = use.body['user'];
                                if (user !== undefined) {
                                    this.messageObject.objectId = use.body['user']._id
                                }
                                this.messageObject.message = res.body['messageAdmin']['content'];
                                this.message = res.body['message']['content'];
                                this.chatService.showNotification('success', this.message);
                                this.chatService.sendNotification(this.messageObject);
                                console.log(this.messageObject.message)
                                setTimeout(() => {
                                    this.message = '';
                                    this.chatService.identifyUser();
                                    window.location.reload()
                                    // this._router.navigate(['/index'])
                                }, 1500);
                            })
                    } else {
                        this.chatService.showNotification('warning', res.body['message']);
                    }
                })
            } else {
                console.log('Cancel');
            }
        });
    }

}

@Component({
    selector: 'app-dialog-pay',
    templateUrl: 'dialog-pay.html',
    styleUrls: ['./history-book.component.css']
})
export class PayDialogComponent {
    amount: string
    pay = true

    constructor(
        public dialogRef: MatDialogRef<PayDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        this.amount = data['data'].totalMoney.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'VND'
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


    onNoClick(): void {
        this.dialogRef.close();
    }
}

@Component({
    selector: 'app-dialog-pay-cancel',
    templateUrl: 'dialog-pay-cancel.html',
    styleUrls: ['./history-book.component.css']
})
export class PayCancelDialogComponent {
    amount: string
    pay = true
    book: any;

    constructor(
        public dialogRef: MatDialogRef<PayDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        this.book = data['data']
        console.log(this.book)
        this.book.totalMoney = data['data'].totalMoney.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
