import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ChatService } from '../../../shared/service/chat.service';
import { ChooseRoomTypeDialogComponent } from '../../choose-room-type-dialog/choose-room-type-dialog.component';
import { SearchHotel } from '../../../shared/model/search-hotel';
import { AppSetting } from '../../../appsetting';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as io from 'socket.io-client';
import { LoginServiceService } from '../../../shared/service/login-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../shared/service/user.service.';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-index-layout',
    templateUrl: './index-layout.component.html',
    styleUrls: ['./index-layout.component.scss']
})
export class IndexLayoutComponent implements OnInit {
    socket;
    BASE_URL = AppSetting.BASE_SERVER_URL;

    submitted = false;
    registerForm: FormGroup;

    tfaFlag = false
    userObject = {
        email: '',
        password: ''
    }

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
    isModeration = false;
    showModal = false;
    imageUrl = 'jbiajl3qqdzshdw0z749'
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
        this.isModeration = this.cookie.get('role') !== '' ? true : false;
        this.isAuthenicate = this.cookie.get('email') !== '' ? true : false;
        this.searchHotel.total = 'Thông tin phòng'
        this.registerForm = this.formBuilder.group({

            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

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
            height: '45vh',
            maxHeight: '45vh',
            position: { top: '360px' },
            data: { searchHotel: this.searchHotel },
        });
        return dialogRef.afterClosed();
    }
    searchHotelServer(event) {
        this.chatService.showNotification('success', 'Tìm kiếm thành công');
    }
    loginUser() {
        this.submitted = true;


        if (this.registerForm.invalid) {
            return;
        }

        this._loginService.loginAuth(this.userObject).subscribe((userData) => {
            this.errorMessage = null;
            if (userData.body['status'] === 200) {
                this._loginService.updateAuthStatus(true);
                const user = userData.body;
                let role;

                for (const key of Object.keys(user)) {
                    if (key === 'role') {
                        role = user[key];
                    }
                    if (key === 'image') {
                        this.imageUrl = user[key];
                    }
                    if (parseInt(role) === -1) {
                        this.errorMessage = 'Bạn chưa xác thực email đã đăng ký';
                        return;
                    }
                    if (key === 'user') {
                        const users = user[key];
                        this.id = users._id;
                        this.user = users.name;
                        this.cookie.set('token', '');
                        this.cookie.set('token', users.token);
                        this.cookie.set('isAuthenicate', '');
                        this.cookie.set('isAuthenicate', '1');
                    }
                    if (key === 'role') {
                        role = user[key];
                        this.cookie.set('role', role);
                        console.log(role)
                        if (role !== undefined && role !== '') {
                            this.isModeration = true
                            console.log(role)
                        }
                    }
                    if (key === 'objectId') {
                        const ObjectId = user[key];
                        this.cookie.set('ObjectId', ObjectId);
                        console.log(ObjectId)
                    }
                }
                this.showModal = false;
                const radio: HTMLElement = document.getElementById('close-modal');
                radio.click();
                sessionStorage.setItem('user', this.userObject.email);
                this.cookie.set('email', '');
                this.cookie.set('email', this.userObject.email);
                this.isAuthenicate = true;
                // this.getMessage();
                this.href = this._router.url;

                this.message = '';
                // if (this.addPassenger == true) {
                //     console.log('true');
                //     this._router.navigate(['/addRecipe']);
                //     this.addPassenger = false;
                // } else
                if (this.href === '/index') {
                    window.location.reload();

                } else {
                    console.log('reload')

                    this._router.navigate(['/index']);
                    // this._router.navigate(['/index']);
                }
                this.socket = io(AppSetting.BASE_SERVER_URL);
                // this.data.name = this.cookie.get('ObjectId');
                // this.data.userId = this.socket['id'];
                // console.log(this.socket);
                // this.socket.emit('setSocketId', this.data);
            }
            if (userData.body['status'] === 206) {
                this.tfaFlag = true;
            }
            if (userData.body['status'] !== 200) {
                this.errorMessage = userData.body['message'];
            }
            if (userData.body['status'] === 404) {
                this.errorMessage = userData.body['message'];
            }
        })
    }
}

interface Object {
    [key: string]: any;
}
