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
    if(popUp.closed){

    }
  }
}
