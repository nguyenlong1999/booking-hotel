import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';

@Component({
    selector: 'app-hotel-map',
    templateUrl: './hotel-map.component.html',
    styleUrls: ['./hotel-map.component.css']
})
export class HotelMapComponent implements OnInit {
    public map: any = {lat: 51.678418, lng: 7.809007};


    constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    }

    ngOnInit(): void {

    }

}
