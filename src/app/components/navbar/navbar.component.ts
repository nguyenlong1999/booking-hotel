import {Component, OnInit, ElementRef, Input} from '@angular/core';
import {ROUTES} from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Router} from '@angular/router';
import {LoginServiceService} from 'app/shared/service/login-service.service';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {Message} from '../../shared/model/message';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../../shared/service/user.service.';
import {ChatService} from '../../shared/service/chat.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    userMessages: Message[] = [];
    userObject = {
        email: '',
    }
    messageEmpty = false;
    countNewMessage = 0;
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    languageChangeImage: any
    newMessage = 'currentMessage';

    constructor(
        private title: Title,
        location: Location,
        private element: ElementRef,
        private router: Router,
        private _loginService: LoginServiceService,
        private  translate: TranslateService,
        private cookieService: CookieService,
        private userService: UserService,
        private chatService: ChatService
    ) {
        this.location = location;
        this.sidebarVisible = false;
        translate.setDefaultLang('vi');
        sessionStorage.setItem('currentLang', 'vi');
        this.getMessage();
        this.mailBox();
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
    }

    getMessage() {
        this.userMessages = [];
        const email = this.cookieService.get('email');
        if (email !== '') {
            this.userObject.email = email
            this.userService.findMessage(this.userObject).subscribe(data => {
                const temp = data.body['message']
                for (const mess of temp) {
                    if (mess.news === 0) {
                        this.countNewMessage++
                        mess.news = 'newMessage';
                    } else {
                        mess.news = 'currentMessage';
                    }
                    this.userMessages.push(mess)
                }
                if (this.userMessages.length === 0) {
                    this.messageEmpty = true;
                }
                console.log('message is empty = ' + this.messageEmpty);
                console.log('count new messages = ' + this.countNewMessage);
            });
        }
    }

    mailBox() {
        this.chatService.getMessages().subscribe(mail => {
            // console.log('mail:', mail);
            if (mail !== undefined) {
                const mess = new Message;
                mess.content = mail;
                mess.news = 0;
                console.log(mess);
                if (mess['content']['get-list-online'] === undefined) {
                    this.userMessages.push(mess);
                    console.log(this.userMessages);
                    for (const message of this.userMessages) {
                        if (message.news === 0) {
                            this.countNewMessage++;
                        }
                    }
                    if (this.userMessages.length !== 0) {
                        this.messageEmpty = false;
                    }
                    this.chatService.showNotification('success', mess.content);
                }
            }
        })
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
        console.log(this.userMessages);
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

            $layer.onclick = function () { //asign a function
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
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    logout() {
        this._loginService.logoutUser()
        this.router.navigateByUrl('/login')
    }

    useLanguage(language: string) {
        console.log(this.translate)
        console.log(language);
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

    }
}
