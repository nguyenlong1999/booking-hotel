import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-layout',
  templateUrl: './index-layout.component.html',
  styleUrls: ['./index-layout.component.scss']
})
export class IndexLayoutComponent implements OnInit {
  private address;
  constructor() {
  }

  ngOnInit() {
  }
  getEstablishmentAddress(place: object) {
    this.address = place['formatted_address'];
  }
}
