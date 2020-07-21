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
import {Hotel} from '../model/hotel';

@Injectable({
    providedIn: 'root'
})
export class HotelService {
    private baseUrl: string = AppSetting.BASE_SERVER_URL;

    constructor(private _http: HttpClient, private cookie: CookieService) {
    }

    bookingHotel(book: any) {
        return this._http.post(`${this.baseUrl}/createBooking`, {book: book}, {observe: 'response'});
    }

    getBookingByUser = (idUser): Observable<any> => {
        return this._http
            .get<any>(`${this.baseUrl}/getBookingByHotel/${idUser}`)
            .pipe(tap(_ => console.log('load booking')));
    };

    createHotel(hotel: any) {
        return this._http.post(`${this.baseUrl}/createHotel`, {hotel: hotel}, {observe: 'response'});
    }


    editHotel(hotel: any) {
        return this._http.post(`${this.baseUrl}/updateHotel`, {hotel: hotel}, {observe: 'response'});
    }

    getHotelFind(searchOption: any) {
        return this._http.post(`${this.baseUrl}/getHotelFind`, {searchOption: searchOption}, {observe: 'response'});
    }

    updateStatusHotel(hotel: any) {
        return this._http.post(`${this.baseUrl}/updateStatusHotel`, {hotel: hotel}, {observe: 'response'});
    }

    getHotels = (): Observable<Hotel[]> => {
        return this._http
            .get<Hotel[]>(`${this.baseUrl}/getHotels`)
            .pipe(tap(_ => console.log('load hotels')));
    };

    getHotelSearch = (): Observable<Hotel[]> => {
        return this._http
            .get<Hotel[]>(`${this.baseUrl}/getHotelSearch`)
            .pipe(tap(_ => console.log('load hotels')));
    };

    getHotelFind = (): Observable<Hotel[]> => {
        return this._http
            .get<Hotel[]>(`${this.baseUrl}/getHotelFind`)
            .pipe(tap(_ => console.log('load hotels')));
    };

    getHotelsByUser = (idUser): Observable<any> => {
        return this._http
            .get<any>(`${this.baseUrl}/getHotelsByUser/${idUser}`)
            .pipe(tap(_ => console.log('load hotels')));
    };

    getHotelById = (idHotel): Observable<any> => {
        const url = `${this.baseUrl}/getHotel/${idHotel}`;
        return this._http
            .get<any>(url)
            .pipe(tap(_ => console.log('load hotels')));
    };


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
