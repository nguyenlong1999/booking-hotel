import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {HotelService} from '../shared/service/hotel.service.';
import {ChatService} from '../shared/service/chat.service';
import {UserService} from '../shared/service/user.service.';

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
    updateStatusObject = {
        actionName: '',
        idUserBook: '',
        idBooking: '',
        idUserHotel: ''
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
    ) {
        const paramReq = this.route.snapshot
        console.log(paramReq)
        this.amount = paramReq.fragment
        this.idBooking = paramReq.params.id
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
                        this.message =  res.body['message']['content'];
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
                        this.message =  res.body['message']['content'];
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

}
