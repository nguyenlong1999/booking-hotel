import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

import {AppSetting} from '../../appsetting';
import {tap} from 'rxjs/operators';
import {User} from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl: string = AppSetting.BASE_SERVER_URL;
    headerOptions: any = null;

    _isLoggedIn = false;

    authSub = new Subject<any>();

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private _http: HttpClient, private cookie: CookieService) {
    }

    likeAddPoint(user: any) {
        return this._http.post(
            `${this.baseUrl}/addPoint`,
            {user: user},
            {observe: 'response'}
        );
    }

    updateRole(user: any) {
        return this._http.post(`${this.baseUrl}/updateRole`, {user: user}, {observe: 'response'});
    }

    updateReport(user: any) {
        return this._http.post(`${this.baseUrl}/updateReport`, {user: user}, {observe: 'response'});
    }

    bannedUser(user: any) {
        return this._http.post(`${this.baseUrl}/bannedUser`, {user: user}, {observe: 'response'});
    }

    openUser(user: any) {
        return this._http.post(`${this.baseUrl}/openUser`, {user: user}, {observe: 'response'});
    }

    dislikeremovePoint(user: any) {
        return this._http.post(
            `${this.baseUrl}/removePoint`,
            {user: user},
            {observe: 'response'}
        );
    }

    getUsers = (): Observable<User[]> => {
        return this._http
            .get<User[]>(`${this.baseUrl}/getUsers`)
            .pipe(tap(_ => console.log('load users')));
    };
    getActiveUsers = (): Observable<User[]> => {
        return this._http
            .get<User[]>(`${this.baseUrl}/getActiveUsers`)
            .pipe(tap(_ => console.log('load users')));
    };
    getNewUsers = (): Observable<User[]> => {
        return this._http
            .get<User[]>(`${this.baseUrl}/getNewUsers`)
            .pipe(tap(_ => console.log('load getNewUsers')));
    };
    getTopUsers = (): Observable<User[]> => {
        return this._http
            .get<User[]>(`${this.baseUrl}/getTopUsers`)
            .pipe(tap(_ => console.log('load getTopUsers')));
    };

    testEmail(email: any) {
        return this._http.post(
            `${this.baseUrl}/testEmail`,
            {email: email},
            {observe: 'response'}
        );
    }

    activeMember = (id: string): Observable<User> => {
        const url = `${this.baseUrl}/active/${id}`;
        return this._http.get<User>(url).pipe(
            tap(_ => console.log('helo'))
        );
    }

    findMessage(user: any) {
        return this._http.post(`${this.baseUrl}/findMessage`, {user: user}, {observe: 'response'});
    }

    updateNews(user: any) {
        return this._http.post(`${this.baseUrl}/updateNews`, {user: user}, {observe: 'response'});
    }

    getUserOnlineInfo(user: any) {
        return this._http.post(`${this.baseUrl}/getUserOnlineInfo`, {user: user}, {observe: 'response'});
    }

    getMemberInfo = (email: string): Observable<User> => {
        const url = `${this.baseUrl}/getMemerInfo/${email}`;
        return this._http.get<User>(url).pipe(
            tap(_ => console.log('helo'))
        );
    }

    updateUser(user: any) {
        return this._http.post(`${this.baseUrl}/updateUser`, {user: user}, {observe: 'response'});
    }

    changePassword(user: any) {
        return this._http.post(`${this.baseUrl}/changePassword`, {user: user}, {observe: 'response'});
    }

    resetPassword(user: any) {
        return this._http.post(`${this.baseUrl}/resetPassword`, {user: user}, {observe: 'response'});
    }

    getSummary(user: any) {
        return this._http.post(`${this.baseUrl}/getSummary`, {user: user}, {observe: 'response'});
    }
}
