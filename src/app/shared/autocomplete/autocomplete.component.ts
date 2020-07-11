import {Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {} from 'googlemaps';

@Component({
    selector: 'AutocompleteComponent',
    template: `
        <input class="input"
               type="text"
               [(ngModel)]="autocompleteInput"
               #addresstext style="padding: 12px 20px; border: 1px solid #ccc; width: 100%"
        >
        <div id="map" style="display: none;"></div>
        <div id="info-content" style="display: none;"></div>
    `,
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
    @Input() adressType: string;
    // tslint:disable-next-line:no-input-rename
    @Input('width') private width = '600px';
    @Output() setAddress: EventEmitter<any> = new EventEmitter();
    @ViewChild('addresstext') addresstext: any;


    autocompleteInput: string;
    queryWait: boolean;
    private map;
    private infoWindow;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.getPlaceAutocomplete();
    }

    private getPlaceAutocomplete() {
        const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
            {
                // componentRestrictions: { country: 'US' },
                types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
            });
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            this.invokeEvent(place);
            console.log(place)
        });
    }

    invokeEvent(place: Object) {
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: new google.maps.LatLng(-33.8665433, 151.1956316),
            mapTypeControl: false,
            panControl: false,
            zoomControl: false,
            streetViewControl: false
        });
        this.infoWindow = new google.maps.InfoWindow({
            content: document.getElementById('info-content')
        });
        if (place['geometry']) {
            this.map.panTo(place['geometry'].location);
            this.map.setZoom(7);
        }
        let places = new google.maps.places.PlacesService(this.map);
        let search = {
            bounds: this.map.getBounds(),
            types: ['tourist_attraction']
        };
        // places.nearbySearch(search, function (results, status,pagination) {
        //     if (status === google.maps.places.PlacesServiceStatus.OK) {
        //         console.log(results);
        //
        //     } else {
        //         console.log(results);
        //     }
        // });
        this.setAddress.emit(place);
        console.log('autocomplete',place);
    }

}
