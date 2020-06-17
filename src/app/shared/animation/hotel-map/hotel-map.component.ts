import {Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';

@Component({
    selector: 'app-hotel-map',
    templateUrl: './hotel-map.component.html',
    styleUrls: ['./hotel-map.component.css']
})
export class HotelMapComponent implements OnInit {

    @Input() lat
    @Input() lng
    public map: any = {lat: this.lat, lng: this.lng};

    constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    }

    ngOnInit(): void {

    }

}
