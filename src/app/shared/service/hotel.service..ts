import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

import {AppSetting} from '../../appsetting';
import {tap} from 'rxjs/operators';
import {Hotel} from '../model/hotel';

@Injectable({
    providedIn: 'root'
})
export class HotelService {
    private baseUrl: string = AppSetting.BASE_SERVER_URL;

    constructor(private _http: HttpClient, private cookie: CookieService) {
    }

    addComment(comment: any) {
        return this._http.post(`${this.baseUrl}/addComment`, {comment: comment}, {observe: 'response'});
    }

    getComments = (): Observable<Comment[]> => {
        return this._http.get<Comment[]>(`${this.baseUrl}/getComments`)
            .pipe(
                tap(_ => console.log('load getAllComment'))
            );
    }

    deleteComment(comment: any) {
        return this._http.post(`${this.baseUrl}/deleteComment`, {comment: comment}, {observe: 'response'});
    }

    bookingHotel(book: any) {
        return this._http.post(`${this.baseUrl}/createBooking`, {book: book}, {observe: 'response'});
    }

    updateStatusBook(book: any) {
        return this._http.post(`${this.baseUrl}/updateStatusBook`, {booking: book}, {observe: 'response'});
    }

    updateRatingBook(object: any) {
        return this._http.post(`${this.baseUrl}/updateRatingBook`, {object: object}, {observe: 'response'});
    }

    getBookingByUser = (idUser): Observable<any> => {
        return this._http
            .get<any>(`${this.baseUrl}/getBookingByHotel/${idUser}`)
            .pipe(tap(_ => console.log('load booking')));
    };

    getBookingByUserRegister = (idUser): Observable<any> => {
        return this._http
            .get<any>(`${this.baseUrl}/getBookingByUserRegister/${idUser}`)
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

    getHotelFindAll = (): Observable<Hotel[]> => {
        return this._http
            .get<Hotel[]>(`${this.baseUrl}/getHotelFindAll`)
            .pipe(tap(_ => console.log('load hotels')));
    };

    getHotelSearch = (): Observable<Hotel[]> => {
        return this._http
            .get<Hotel[]>(`${this.baseUrl}/getHotelSearch`)
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
