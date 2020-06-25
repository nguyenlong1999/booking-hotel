import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject, Observable, throwError} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {Token} from '../model/token';

import {AppSetting} from '../../appsetting';
import {retry, catchError, tap} from 'rxjs/operators';
import {User} from '../model/user';
import {Message} from '../model/message';
import {Summary} from '../model/summary';

@Injectable({
    providedIn: 'root'
})
export class HotelService {
    private baseUrl: string = AppSetting.BASE_SERVER_URL;

    constructor(private _http: HttpClient, private cookie: CookieService) {
    }

    createHotel(hotel: any) {
        return this._http.post(`${this.baseUrl}/createHotel`, {hotel: hotel}, {observe: 'response'});
    }

    // changePassword(user: any) {
    //     return this._http.post(`${this.baseUrl}/changePassword`, {user: user}, {observe: 'response'});
    // }
    //
    // resetPassword(user: any) {
    //     return this._http.post(`${this.baseUrl}/resetPassword`, {user: user}, {observe: 'response'});
    // }
    //
    // getSummary(user: any) {
    //     return this._http.post(`${this.baseUrl}/getSummary`, {user: user}, {observe: 'response'});
    // }
}
