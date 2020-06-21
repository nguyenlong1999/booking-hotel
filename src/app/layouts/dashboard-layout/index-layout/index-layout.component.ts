import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-layout',
  templateUrl: './index-layout.component.html',
  styleUrls: ['./index-layout.component.scss']
})
export class IndexLayoutComponent implements OnInit {
  private address;
  constructor() {
    window.addEventListener('wheel', function (event) {
      if (event.deltaY < 0) {
        console.log('scrolling up');
        const element = document.getElementById('check-point');
        element.setAttribute('style', 'background-color:black!important;');
      } else if (event.deltaY > 0) {
        console.log('scrolling down');
        // tslint:disable-next-line:no-duplicate-variable
        const element = document.getElementById('check-point');
        element.setAttribute('style', 'background-color:white!important;');
      }
    });
  }

  ngOnInit() {
  }
  getEstablishmentAddress(place: object) {
    this.address = place['formatted_address'];
  }
}
