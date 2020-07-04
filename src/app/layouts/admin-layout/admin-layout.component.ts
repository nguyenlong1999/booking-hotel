import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Location, PopStateEvent} from '@angular/common';
import 'rxjs/add/operator/filter';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import * as $ from 'jquery';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {ChatService} from '../../shared/service/chat.service';
import {Message} from '../../shared/model/message';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../../shared/service/user.service.';
import {User} from '../../shared/model/user';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
    _router: Subscription;
    lastPoppedUrl: string;
    yScrollStack: number[] = [];
    newMessage = false;
    messageEmpty = false;
    userMessages: Message[] = [];
    userChatList: User [] = [];
    guessMessages: Message[] = [];
    @Input('ngModel') message;
    userOnline: String[] = [];
    userObject = {
        email: ''
    }

    constructor(
        public location: Location, private router: Router,
        private translate: TranslateService,
        private title: Title,
        private  chatService: ChatService,
        private cookieService: CookieService,
        private userService: UserService
    ) {
        translate.setDefaultLang('vi');
        sessionStorage.setItem('currentLang', 'vi');
        // this.mailBox();
        this.userService.getActiveUsers().subscribe(data => {
            console.log(data)
            this.userChatList = data;
            const id = this.cookieService.get('ObjectId');
            this.userChatList = this.userChatList.filter(user => user._id !== id);
            this.userChatList.forEach(user => {
                user.online = false;
                if (this.userOnline.length > 0) {
                    this.userOnline.forEach(id => {
                        if (id === user._id) {
                            user.online = true;
                        }
                    });
                }
            });

            console.log(this.userOnline);
            console.log(this.userChatList);
        });
    }

    ngOnInit() {
        this.translate.get('Đặt phòng khách sạn').subscribe(name => {
            this.title.setTitle(name);
        });
        const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

        if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
            // if we are on windows OS we activate the perfectScrollbar function

            document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
        } else {
            document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
        }
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                if (event.url != this.lastPoppedUrl) {
                    this.yScrollStack.push(window.scrollY);
                }
            } else if (event instanceof NavigationEnd) {
                if (event.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else {
                    window.scrollTo(0, 0);
                }
            }
        });
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            elemMainPanel.scrollTop = 0;
            elemSidebar.scrollTop = 0;
        });
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            let ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
        }

        const window_width = $(window).width();
        const $sidebar = $('.sidebar');
        const $sidebar_responsive = $('body > .navbar-collapse');
        const $sidebar_img_container = $sidebar.find('.sidebar-background');

        if (window_width > 767) {
            if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
                $('.fixed-plugin .dropdown').addClass('open');
            }

        }

        $('.fixed-plugin a').click(function (event) {
            // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
            if ($(this).hasClass('switch-trigger')) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                } else if (window.event) {
                    window.event.cancelBubble = true;
                }
            }
        });

        $('.fixed-plugin .badge').click(function () {
            const $full_page_background = $('.full-page-background');


            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            const new_color = $(this).data('color');

            if ($sidebar.length !== 0) {
                $sidebar.attr('data-color', new_color);
            }

            if ($sidebar_responsive.length != 0) {
                $sidebar_responsive.attr('data-color', new_color);
            }
        });

        $('.fixed-plugin .img-holder').click(function () {
            const $full_page_background = $('.full-page-background');

            $(this).parent('li').siblings().removeClass('active');
            $(this).parent('li').addClass('active');


            const new_image = $(this).find('img').attr('src');

            if ($sidebar_img_container.length != 0) {
                $sidebar_img_container.fadeOut('fast', function () {
                    $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
                    $sidebar_img_container.fadeIn('fast');
                });
            }

            if ($full_page_background.length != 0) {

                $full_page_background.fadeOut('fast', function () {
                    $full_page_background.css('background-image', 'url("' + new_image + '")');
                    $full_page_background.fadeIn('fast');
                });
            }

            if ($sidebar_responsive.length != 0) {
                $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
            }
        });
        setTimeout(() => {
            this.getListOnline();

        }, 5000);
    }

    ngAfterViewInit() {
        this.runOnRouteChange();
        this.getListOnline();
    }

    getListOnline() {
        const message = new Message();
        message.objectId = this.cookieService.get('ObjectId');
        message.message = 'get list user';
        this.chatService.getListMember(message);
    }

    // mailBox() {
    //     this.chatService.getMessages().subscribe(mail => {
    //         // console.log('mail:', mail);
    //         if (mail !== undefined) {
    //             // this.newMessage = true;
    //             const mess = new Message;
    //             // mess.content = mail;
    //             // mess.news = true;
    //             console.log(mess);
    //             if (mess['content']['get-list-online'] !== undefined) {
    //                 console.log(mess['content']['get-list-online']);
    //                 let userOnline = JSON.stringify(mess['content']['get-list-online']);
    //                 userOnline = userOnline.substring(1);
    //                 userOnline = userOnline.substring(0, userOnline.length - 1);
    //                 const userOnlineArray = userOnline.split(',');
    //                 userOnlineArray.forEach(user => {
    //                     const tempArr = user.split(':');
    //                     if (tempArr.length > 0) {
    //                         let mystring = tempArr[0];
    //                         mystring = mystring.substring(1);
    //                         mystring = mystring.substring(0, mystring.length - 1);
    //                         if (!this.userOnline.includes(mystring)) {
    //                             this.userOnline.push(mystring);
    //                         }
    //                     }
    //                 });
    //                 this.userService.getActiveUsers().subscribe(data => {
    //                     console.log(data)
    //                     this.userChatList = data;
    //                     const id = this.cookieService.get('ObjectId');
    //                     this.userChatList = this.userChatList.filter(user => user._id !== id);
    //                     this.userChatList.forEach(user => {
    //                         this.userOnline.forEach(id => {
    //                             if (id === user._id) {
    //                                 user.online = true;
    //                             }
    //                         });
    //                     });
    //
    //                     console.log(this.userOnline);
    //                     console.log(this.userChatList);
    //                 });
    //             } else {
    //                 this.userMessages.push(mess);
    //                 // this.chatService.showNotification('success', mess.content);
    //             }
    //             console.log(this.userMessages);
    //
    //         }
    //     })
    // }
    sendMessage() {
        console.log(this.message)
        const message = new Message();
        message.objectId = this.cookieService.get('ObjectId');
        message.message = this.message;
        const time = new Date();
        message.time = this.formatDate(time);
        this.userMessages.push(message);
        this.chatService.sendMessage(message);
        console.log(message)
        const radio: HTMLElement = document.getElementById('msg_history');
        radio.innerHTML += ' <div class="outgoing_msg" style="float: right;display:block;overflow:hidden;clear: both;">\n' +
            '<div class="sent_msg" style="overflow:hidden; margin:6px 0 6px;">\n' +
            '<p style="background: #05728f none repeat scroll 0 0;\n' +
            '  border-radius: 3px;\n' +
            '  font-size: 10px;\n' +
            '  margin: 0; color:#fff;\n' +
            '  padding: 5px 10px 5px 12px;\n' +
            '  width:100%;\n' +
            '  display: block;\n' +
            '  text-align: left;">' + this.message + '</p>\n' +
            '<span class="time_date" style="font-size: 8px;">' + message.time + '</span>' +
            '</div>\n' +
            '                                    </div>';
        this.message = '';

    }

    reponse() {
        const message = new Message();
        message.objectId = this.cookieService.get('ObjectId');
        message.message = 'reponse';
        const time = new Date();
        message.time = this.formatDate(time);
        this.guessMessages.push(message);
        this.chatService.sendMessage(message);
        console.log(message)
        const radio: HTMLElement = document.getElementById('msg_history');
        radio.innerHTML += ' <div class="outgoing_msg" style="float: left;display: block;clear: both;">\n' +
            '<img  src="http://localhost:8000/api/images/default-avatar.png" alt="sunil" style="border-radius: 50%;width: 25px;height: 25px;float:left;"/>' +
            '<span class="time_date" style="font-size: 8px;">' + message.time + '</span>' +
            '<div class="sent_msg" style="overflow:hidden; margin:6px 0 6px;">\n' +
            '<p style="background: lightgrey none repeat scroll 0 0;\n' +
            '  border-radius: 3px;\n' +
            '  font-size: 10px;\n' +
            '  margin: 0; color:#fff;\n' +
            '  padding: 5px 10px 5px 12px;\n' +
            '  width:100%;\n' +
            '  display: block;\n' +
            '  text-align: left;">' + this.message + '</p>\n' +
            '</div>\n' +
            '                                    </div>';
        this.message = '';
    }

    useLanguage(language: string) {
        this.translate.use(language);
        console.log(language);
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

    isMaps(path) {
        let titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice(1);
        if (path == titlee) {
            return false;
        } else {
            return true;
        }
    }

    formatDate(dt) {
        const normalizeHour = dt.getHours() >= 13 ? dt.getHours() - 12 : dt.getHours()
        return dt.getHours() >= 13 ? normalizeHour + ': ' + dt.getMinutes() + ' PM' : normalizeHour + ': ' + dt.getMinutes() + ' AM ' + dt.getDate() + '-' + dt.getMonth();
    }

    onActivate(event) {
        const scrollToTop = window.setInterval(() => {
            const pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20); // how far to scroll on each step
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 16);
    }

    runOnRouteChange(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
            const ps = new PerfectScrollbar(elemMainPanel);
            ps.update();
        }
    }

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

}
