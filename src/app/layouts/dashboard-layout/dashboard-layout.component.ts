import {Component, ElementRef, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginServiceService} from '../../shared/service/login-service.service';
import {TranslateService} from '@ngx-translate/core';
import {ROUTES} from '../../components/sidebar/sidebar.component';
import {AppSetting} from '../../appsetting';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SearchHotel} from '../../shared/model/search-hotel';
import {MatDialog} from '@angular/material/dialog';
import {ChatService} from '../../shared/service/chat.service';
import {UserService} from '../../shared/service/user.service.';
import {CookieService} from 'ngx-cookie-service';
import * as io from 'socket.io-client';
import {EventEmitterService} from '../../shared/service/event-emitter.service';
import {Summary} from '../../shared/model/summary';
import {Observable} from 'rxjs';
import {HotelService} from '../../shared/service/hotel.service.';
import {ChooseRoomTypeDialogComponent} from '../choose-room-type-dialog/choose-room-type-dialog.component';
import {Message} from '../../shared/model/message';


@Component({
    selector: 'app-dashboard-layout',
    templateUrl: './dashboard-layout.component.html',
    styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
    private listTitles: any[];
    userMessages: Message[] = [];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    languageChangeImage: any
    checkLanguage = true;
    countNewMessage = 0;
    messageEmpty = false;
    socket;
    BASE_URL = AppSetting.BASE_SERVER_URL;
    submitted = false;
    isLogined = false
    registerForm: FormGroup;
    isLang = true; // true is vi
    tfaFlag = false;
    openDialog = false;
    userObject = {
        email: '',
        password: ''
    }

    data = {
        name: '',
        userId: ''
    }
    public href = '';
    summary: Summary;
    private address;
    isAuthenicate = false;
    errorMessage: string = null;
    id = '1'
    user = '';
    isModeration = false;
    showModal = false;
    imageUrl = 'assets/img/new_logo.png'
    message = '';
    searchHotel = new SearchHotel('', '1', '1', '1');
    searchPerson = ''

    constructor(
        private title: Title,
        location: Location,
        private element: ElementRef,
        private router: Router,
        private _loginService: LoginServiceService,
        public dialog: MatDialog,
        private chatService: ChatService,
        private _router: Router,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private translate: TranslateService,
        private cookie: CookieService,
        private emitEventCus: EventEmitterService,
        private hotelService: HotelService,
        private eventEmitterService: EventEmitterService,
        private cookieService: CookieService,
    ) {
        this.location = location;
        this.sidebarVisible = false;
        translate.setDefaultLang('vi');
        sessionStorage.setItem('currentLang', 'vi');
        this.getSummary();
        this.mailBox();
        window.addEventListener('wheel', function (event) {
            if (event.deltaY < 0) {
                // console.log('scrolling up');
                const element = document.getElementById('check-point');
                if (element !== undefined) {
                    element.setAttribute('style', 'background-color:white!important;');
                    const element2 = document.getElementById('check-point-search');
                    element2.setAttribute('style', 'display:none');
                }
            } else if (event.deltaY > 0) {
                // console.log('scrolling down');
                // tslint:disable-next-line:no-duplicate-variable
                const element = document.getElementById('check-point');
                // element.setAttribute('style', 'background-color:black!important;');
                if (element !== undefined) {
                    element.setAttribute('style', 'display:none');
                    const element2 = document.getElementById('check-point-search');
                    element2.setAttribute('style', 'display:block;background-color:#230a6f!important');
                }
            }
        });
    }

    ngOnInit() {
        // call fuc login
        if (this.eventEmitterService.subsVar === undefined) {
            this.eventEmitterService.subsVar = this.eventEmitterService.invokeFirstComponentFunction.subscribe(() => {
                this.onChangecheck(1);
            });
        }
        if (this.cookie.get('email') !== '' ? true : false) {
            this.getNotification();
        }
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            // this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
        this.getImage()
        this.isModeration = this.cookie.get('role') === '2' || this.cookie.get('role') === '1' ? true : false;
        this.isAuthenicate = this.cookie.get('email') !== '' ? true : false;
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    getSummary() {
        this.userService.getSummary(1).subscribe(data => {
            this.summary = data.body['summary']
            // this.loadInfo == true
            console.log('SUMARY: ')
            console.log(this.summary);
        })
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    redirect() {
        if (this.isModeration === false) {
            alert('Vui lòng liên hệ với ban quản trị để được phép đăng nhập')
        } else {
            this._router.navigate(['/hotels']);
        }
    }

    closeButtonRegister() {
        this._router.navigate(['/user-register']);
        const radio: HTMLElement = document.getElementById('close-modal');
        radio.click();
    }

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //  asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle() {
        let titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (let item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    logoutUser() {
        this._loginService.logoutUser()

        this.isAuthenicate = false;
        this.showModal = false;
        let token = this.cookie.get('token');
        if (token !== '') {
            this.cookie.set('token', '');
        }
        this.isLogined = false
        this.href = this._router.url;
        if (this.href === '/index') {
            window.location.reload();
        } else {
            this._router.navigate(['/'])
        }
        this.cookie.deleteAll();
    }

    useLanguage(language: string) {
        this.checkLanguage = !this.checkLanguage;
        this.translate.use(language);
        if (language === 'en') {
            this.translate.get('Booking Hotel').subscribe(name => {
                this.title.setTitle(name);
            });
        } else {
            this.translate.get('Đặt phòng khách sạn').subscribe(name => {
                this.title.setTitle(name);
            });
        }
        sessionStorage.setItem('currentLang', language);
        // create call func in index
        this.emitEventCus.onFirstComponentButtonClick(language);
    }

    loginUser() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }

        this._loginService.loginAuth(this.userObject).subscribe((userData) => {
            this.errorMessage = null;
            console.log(userData)
            if (userData.body['status'] === 200) {
                this._loginService.updateAuthStatus(true);
                const user = userData.body;
                console.log(user)
                let role;
                for (const key of Object.keys(user)) {
                    if (key === 'role') {
                        role = user[key];
                    }
                    if (key === 'image') {
                        if (user[key] != null || !user[key].isEmpty) {
                            this.imageUrl = this.BASE_URL + '/api/images/' + user[key];
                        }
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
                        console.log(role)
                        this.cookie.set('role', role);
                        if (role !== undefined && role !== '' && (role === 2 || role === 1)) { // admin = 2
                            this.isModeration = true
                        }
                    }
                    if (key === 'objectId') {
                        const ObjectId = user[key];
                        this.cookie.set('ObjectId', ObjectId);
                    }
                }
                this.showModal = false;
                const radio: HTMLElement = document.getElementById('close-modal');
                radio.click();
                sessionStorage.setItem('user', this.userObject.email);
                this.cookie.set('email', '');
                this.cookie.set('email', this.userObject.email);
                this.isAuthenicate = true;
                this.href = this._router.url;

                this.message = '';
                // if (this.addPassenger == true) {
                //     console.log('true');
                //     this._router.navigate(['/addRecipe']);
                //     this.addPassenger = false;
                // } else
                // if (this.href === '/index') {
                //     window.location.reload();
                //
                // } else {
                //     console.log('reload')
                //
                //     this._router.navigate(['/index']);
                //     // this._router.navigate(['/index']);
                // }
                this.getImage()
                this.getNotification();
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

    getImage() {
        let email = this.cookie.get('email');
        if (email !== '') {
            this._loginService.testEmail(email).subscribe(data => {
                let user = data.body['user'];
                if (user !== undefined && user.imageUrl !== '') {
                    this.imageUrl = this.BASE_URL + '/api/images/' + user.imageUrl

                }
                if (user !== undefined) {
                    this.id = user._id
                    this.user = user.name;
                }
            })
        }
    }

    onChangecheck(value: any) {
        const radio: HTMLElement = document.getElementById('modal-button');
        radio.click();
    }

    searchHotelServer() {
        // console.log(this.searchHotel, this.searchPerson);
        // @ts-ignore\\\\\\\\\\\\\\\\\
        // this.cookie.set('searchText', this.searchHotel.address + ' ' + this.searchPerson);
        // console.log(this.cookie.get('searchText'))
        // this._router.navigateByUrl('/search-hotels')
        // this.chatService.showNotification('success', 'Tìm kiếm thành công');
        // console.log(this.searchHotel);
        // @ts-ignore\\\\\\\\\\\\\\\\\
        this.cookie.set('searchText', JSON.stringify(this.searchHotel));
        // console.log(this.cookie.get('searchText'))
        if (this.router.url === '/search-hotels') {
            window.location.reload();
        } else {
            this._router.navigateByUrl('/search-hotels')
        }
    }

    openDialogChooseHotelType(event) {
        // console.log('help')
        if (this.isLang && this.openDialog === false) {
            this.openDialog = true;
            this.ShowDialogChooseHotelType(event).subscribe(data => {
                const checkSearch = data[0];
                // console.log(checkSearch);
                if (checkSearch !== undefined) {
                    this.searchHotel.total = checkSearch['roomCount'] + ' phòng, ' + checkSearch['personCount'] + ' người lớn'
                    if (checkSearch['childrenCount'] !== undefined && checkSearch['childrenCount'] > 0) {
                        this.searchHotel.total = this.searchHotel.total + ', ' + checkSearch['childrenCount'] + ' trẻ em';
                    }
                    this.openDialog = false;
                }
            })
        } else {
            if (this.openDialog === true) {
                return;
            }
            this.ShowDialogChooseHotelType(event).subscribe(data => {
                const checkSearch = data[0];
                // console.log(checkSearch);
                if (checkSearch !== undefined) {
                    this.searchHotel.total = checkSearch['roomCount'] + ' room, ' + checkSearch['personCount'] + ' adult'
                    if (checkSearch['childrenCount'] !== undefined && checkSearch['childrenCount'] > 0) {
                        this.searchHotel.total = this.searchHotel.total + ', ' + checkSearch['childrenCount'] + ' children';
                    }
                    this.openDialog = false;
                }
            })
        }
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

    updateNews() {
        const email = this.cookieService.get('email');
        if (email !== '') {
            this.userObject.email = email;
            this.userService.updateNews(this.userObject).subscribe(res => {
                if (res.body['status'] === 200) {
                    this.countNewMessage = 0;
                }
            });
        }
        // console.log(this.userMessages);
    }

    getNotification() {
        this.userMessages = [];
        const email = this.cookieService.get('email');
        if (email !== '') {
            this.userObject.email = email
            this.userService.findMessage(this.userObject).subscribe(data => {
                const temp = data.body['message']
                for (const mess of temp) {
                    if (mess.news === 0) {
                        this.countNewMessage++
                    }
                    this.userMessages.push(mess)
                }
                if (this.userMessages.length === 0) {
                    this.messageEmpty = true;
                }
                // console.log('message is empty = ' + this.messageEmpty);
                // console.log('count new messages = ' + this.countNewMessage);
            });
        }
    }

    mailBox() {
        // console.log('get mail')
        this.chatService.getNotifications().subscribe(mail => {
            console.log('mail-notification:', mail);
            if (mail !== undefined) {
                const mess = new Message;
                mess.content = mail;
                mess.news = 0;
                // console.log('count new messages1 = ' + this.countNewMessage);
                if (!mess['content']['get-list-online']) {
                    this.userMessages.push(mess);
                    this.countNewMessage++;
                    this.chatService.showNotification('success', mess.content);
                    if (this.userMessages.length !== 0) {
                        this.messageEmpty = false;
                    }
                }
                // console.log('count new messages2 = ' + this.countNewMessage);
            }
        })
    }
}
