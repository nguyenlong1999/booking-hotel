import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
    selector: 'app-view-pay',
    templateUrl: './view-pay.component.html',
    styleUrls: ['./view-pay.component.css']
})
export class ViewPayComponent implements OnInit {
    private url: SafeResourceUrl;
    private html: SafeHtml;
    amount: string
    constructor(
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute,
    ) {
        const paramReq = this.route.snapshot
        console.log(paramReq)
        this.amount = paramReq.fragment
        // const url = 'https://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder'
        // const html = `<embed src="${url}" width="1000px" height="600px" scale="tofit" />`;
        // console.log(html);
        // this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        // this.html = this.sanitizer.bypassSecurityTrustHtml(html);
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
