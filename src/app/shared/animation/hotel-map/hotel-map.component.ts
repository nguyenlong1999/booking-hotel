import {Component, Input, NgZone, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MapsAPILoader} from '@agm/core';

@Component({
    selector: 'app-hotel-map',
    templateUrl: './hotel-map.component.html',
    styleUrls: ['./hotel-map.component.css']
})
export class HotelMapComponent implements OnInit, OnChanges {

    @Input() lat
    @Input() lng
    @Input() zoom = 6;
    @Input() address = '';
    @Input() name = '';
    public map;
    previous

    constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    }
    ;

    ngOnInit(): void {
        this.map = {lat: this.lat, lng: this.lng};
    }

    clickedMarker(infowindow) {
        if (this.previous) {
            this.previous.close();
        }
        this.previous = infowindow;
    }

    ngOnChanges(changes: SimpleChanges) {

        //current value
        let currentVal = changes.lat.currentValue;
        // previouse value
        let prev = changes.previousValue

        if (currentVal !== undefined) this.lat = currentVal;
        let currentVal1 = changes.lng.currentValue;
        if (currentVal1 !== undefined) this.lng = currentVal1;
        let prev1 = changes.previousValue
        console.log(currentVal, currentVal1)
        if (changes.address.currentValue !== undefined) this.address = changes.address.currentValue;
        if (changes.name.currentValue !== undefined) this.name = changes.name.currentValue;
        this.map = {lat: this.lat, lng: this.lng, zoom: this.zoom};
        console.log(prev, prev1)
    }
}

interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}
