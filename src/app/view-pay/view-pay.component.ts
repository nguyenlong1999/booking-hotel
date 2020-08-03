import {Component, Inject, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {HotelService} from '../shared/service/hotel.service.';
import {ChatService} from '../shared/service/chat.service';
import {UserService} from '../shared/service/user.service.';
// @ts-ignore
import moment = require('moment');
import {AppSetting} from '../appsetting';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../user-access/user-access.component';

@Component({
    selector: 'app-view-pay',
    templateUrl: './view-pay.component.html',
    styleUrls: ['./view-pay.component.css']
})
export class ViewPayComponent implements OnInit {
    private url: SafeResourceUrl;
    private html: SafeHtml;
    amount: string
    idBooking: ''
    booking: any;
    isPay = false;
    BASE_URL = AppSetting.BASE_SERVER_URL + '/api/images/';
    updateStatusObject = {
        actionName: '',
        idUserBook: '',
        idBooking: '',
        idUserHotel: '',
        payMonneyReturn: ''
    }
    message = '';

    errorMessage: String;
    messageObject = {
        objectId: '',
        message: ''
    }

    constructor(
        private hotelService: HotelService,
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute,
        private chatService: ChatService,
        private userService: UserService,
        private _router: Router,
        private dialog: MatDialog,
    ) {
        const paramReq = this.route.snapshot
        this.idBooking = paramReq.params.id
        console.log(this.idBooking)
        if (!paramReq.fragment) {
            this.isPay = true;
        } else {
            this.amount = paramReq.fragment;
            this.hotelService.getBookingById(this.idBooking).subscribe(data => {
                this.booking = data['booking'];
                console.log(this.booking)
                if (this.booking.booking.status === '2') {
                    _router.navigateByUrl('/index')
                }
            });
        }
        if (this.isPay === true) {
            this.hotelService.getBookingById(this.idBooking).subscribe(data => {
                this.booking = data['booking'];
                console.log(this.booking)
                if (this.booking.booking.status !== '2') {
                    _router.navigateByUrl('/index')
                }
                if (this.booking.roomType === null) {
                    this.booking.roomType = 'Tiêu chuẩn'
                }
                if (this.booking.roomType === 1) {
                    this.booking.roomType = 'Tiêu chuẩn'
                }
                if (this.booking.roomType === 2) {
                    this.booking.roomType = 'View đẹp'
                }
                if (this.booking.roomType === 3) {
                    this.booking.roomType = 'Cao cấp'
                }
                if (this.booking.roomType === 4) {
                    this.booking.roomType = 'Siêu sang'
                }
                if (this.booking.roomType === 5) {
                    this.booking.roomType = 'Phòng đôi'
                }
                if (this.booking.roomType === 6) {
                    this.booking.roomType = 'Tổng thống'
                }
                if (this.booking.roomType === 7) {
                    this.booking.roomType = 'Hoàng gia'
                }
                this.booking.booking.fromDate = new Date(moment(JSON.stringify(this.booking.booking.date.begin).split('"')[1])
                    .format('MM/DD/YYYY')).toLocaleDateString()
                this.booking.booking.toDate = new Date(moment(JSON.stringify(this.booking.booking.date.end).split('"')[1])
                    .format('MM/DD/YYYY')).toLocaleDateString()
            })
        }
        // const url = 'https://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder'
        // const html = `<embed src="${url}" width="1000px" height="600px" scale="tofit" />`;
        // console.log(html);
        // this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        // this.html = this.sanitizer.bypassSecurityTrustHtml(html);
    }

    ngOnInit(): void {
    }

    refusePay() {
        this.updateStatusObject.actionName = 'Hủy phòng'
        this.updateStatusObject.idBooking = this.idBooking
        this.hotelService.updateStatusBook(this.updateStatusObject).subscribe(async res => {
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
                        // this.chatService.sendNotification(this.messageObject);
                        console.log(this.messageObject.message)
                        setTimeout(() => {
                            this.message = '';
                            this.chatService.identifyUser();
                            this._router.navigate(['/index'])
                        }, 1500);
                    })
            } else {
                this.chatService.showNotification('warning', res.body['message']);
            }
        })
    }

    AcceptPay() {
        // const radio: HTMLElement = document.getElementById('modal-buttonPay');
        // radio.click();
        this.updateStatusObject.actionName = 'Thanh toán'
        this.updateStatusObject.idBooking = this.idBooking
        console.log(this.updateStatusObject)
        this.hotelService.updateStatusBook(this.updateStatusObject).subscribe(async res => {
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
                            this._router.navigate(['/index'])
                        }, 1500);
                    })
            } else {
                this.chatService.showNotification('warning', res.body['message']);
            }
        })
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

    openDialogCanle() {
        const dialogRef = this.dialog.open(ViewPayDialogComponent, {
            width: '500px',
            data: {
                action: 'cancel'
            }
        })
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'cancel') {
                console.log(this.booking)
                let fromDate = new Date(moment(JSON.stringify(this.booking.booking.date.begin).split('"')[1]).format('MM/DD/YYYY'))
                let amount = this.booking.booking.totalMoney
                let currentTime = new Date();
                let Difference_In_Time = fromDate.getTime() - currentTime.getTime();
                let DaysNumber = Difference_In_Time / (1000 * 3600 * 24) + 1;
                if (DaysNumber >= 7) {
                    amount = (parseFloat(amount.split(' ', 1).toString()
                        .replace(/,/g, '')) * 70 / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'
                } else if (DaysNumber <= 7 && DaysNumber > 1) {
                    amount = (parseFloat(amount.split(' ', 1).toString()
                        .replace(/,/g, '')) * 50 / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'
                } else {
                    amount = '0 VND'
                }
                this.updateStatusObject.actionName = 'Pay Cancel'
                this.updateStatusObject.idBooking = this.idBooking
                this.updateStatusObject.payMonneyReturn = amount
                console.log(this.updateStatusObject)
                this.hotelService.updateStatusBook(this.updateStatusObject).subscribe(async res => {
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
                                // this.chatService.sendNotification(this.messageObject);
                                console.log(this.messageObject.message)
                                setTimeout(() => {
                                    this.message = '';
                                    this.chatService.identifyUser();
                                    this._router.navigate(['/index'])
                                }, 1500);
                            })
                    } else {
                        this.chatService.showNotification('warning', res.body['message']);
                    }
                })
            }
        });
    }
}

@Component({
    selector: 'app-view-pay-dialog',
    templateUrl: 'view-pay-dialog.html',
    styleUrls: ['./view-pay.component.css']
})
export class ViewPayDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ViewPayDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}