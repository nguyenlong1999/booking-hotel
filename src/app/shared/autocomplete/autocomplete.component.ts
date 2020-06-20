import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { } from 'googlemaps';

@Component({
  selector: 'AutocompleteComponent',
  template: `
      <input class="input"
        type="text"
        [(ngModel)]="autocompleteInput"
        #addresstext style="padding: 12px 20px; border: 1px solid #ccc; width: 400px"
        >
      <div id="map" style="display: none;"></div>
  `,
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

  autocompleteInput: string;
  queryWait: boolean;
  private map;
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
    });
  }

  invokeEvent(place: Object) {
      this.map= new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center:{ lat: 54.8, lng: -4.6 },
          mapTypeControl: false,
          panControl: false,
          zoomControl: false,
          streetViewControl: false
      });
    let  places = new google.maps.places.PlacesService(this.map);
    let search = {
    types: ['tourist_attraction']
    };
    places.nearbySearch(search, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);

        } else {
        console.log(results);
        }
        });
    this.setAddress.emit(place);
    console.log(place);
  }

}
