import {Injectable} from '@angular/core';
import {Headers, Response, Http, RequestOptions} from "@angular/http";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {AppSetting} from '../../appsetting';

@Injectable({
    providedIn: 'root'
})
export class GoogleService {
    private url = 'https://maps.googleapis.com/maps/api/place'

    constructor(private http: Http) {
    }

    getFamousAddress(city) {
        let arrayChar = city.split(' ');
        let citySearch = arrayChar.join('+');
        console.log('citySearch', citySearch)
        const gmapsUrl = '/textsearch/json?query=' + citySearch + '+city+point+of+interest&language=en&key=' + AppSetting.GOOGLE_API_KEY;
        return this.http.get(this.url + gmapsUrl).map((response) => response.json());
    }
}
