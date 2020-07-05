import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ChatService} from '../../../shared/service/chat.service';
import {ChooseRoomTypeDialogComponent} from '../../choose-room-type-dialog/choose-room-type-dialog.component';
import {SearchHotel} from '../../../shared/model/search-hotel';
import {AppSetting} from '../../../appsetting';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as io from 'socket.io-client';
import {LoginServiceService} from '../../../shared/service/login-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../shared/service/user.service.';
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-index-layout',
    templateUrl: './index-layout.component.html',
    styleUrls: ['./index-layout.component.scss']
})
export class IndexLayoutComponent implements OnInit {
    socket;
    BASE_URL = AppSetting.BASE_SERVER_URL;



    data = {
        name: '',
        userId: ''
    }
    public href = '';

    private address;
    isAuthenicate = false;
    errorMessage: string = null;
    id = '1'
    user = '';
    message = '';
    searchHotel = new SearchHotel('', 1, 1, 1);

    constructor(
        private _loginService: LoginServiceService,
        public dialog: MatDialog,
        private chatService: ChatService,
        private _router: Router,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private router: ActivatedRoute,
        private translate: TranslateService,
        private cookie: CookieService,
    ) {

    }

    ngOnInit() {
        this.searchHotel.total = 'Thông tin phòng'


    }

    getEstablishmentAddress(place: object) {
        this.address = place['formatted_address'];
    }

    openDialogChooseHotelType(event) {
        this.ShowDialogChooseHotelType(event).subscribe(data => {
            const checkSearch = data[0];
            console.log(checkSearch);
            if (checkSearch !== undefined) {
                this.searchHotel.total = checkSearch['roomCount'] + ' phòng, ' + checkSearch['personCount'] + ' người lớn'
                if (checkSearch['childrenCount'] !== undefined && checkSearch['childrenCount'] > 0) {
                    this.searchHotel.total = this.searchHotel.total + ', ' + checkSearch['childrenCount'] + ' trẻ em';
                }
            }
        })
    }

    ShowDialogChooseHotelType(event): Observable<any> {

        const dialogRef = this.dialog.open(ChooseRoomTypeDialogComponent, {
            width: '40vw',
            maxWidth: '40vw',
            height: 'auto',
            maxHeight: 'auto',
            position: {top: '360px'},
            data: {searchHotel: this.searchHotel},
        });
        return dialogRef.afterClosed();
    }

    searchHotelServer(event) {
        this.chatService.showNotification('success', 'Tìm kiếm thành công');
    }


}

interface Object {
    [key: string]: any;
}
