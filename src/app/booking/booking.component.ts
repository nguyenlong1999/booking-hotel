import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  openPayMent() {
    let url = 'http://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder';
    let popUp= window.open(url, "MsgWindow", "width=1000,height=800");
    var timer = setInterval(
        function checkChild() {
      if (popUp.closed) {
        alert("Child window closed");
        clearInterval(timer);
      }
    }, 500);
  }
}
