import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';
import {AppSetting} from '../../appsetting';
declare var $: any;
@Injectable({
    providedIn: 'root'
})
export class ChatService {
    constructor(private socket: Socket) { }
    public sendMessage(message) {
        console.log('gưi thong báo socket:');
        console.log(message);
        this.socket.emit('new-message', message);
    }
    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('message', (message) => {
                observer.next(message);
            });
        });
    }
    public getListMember(message) {
        console.log('gưi thong báo socket lấy danh sach' + message)
        this.socket.emit('get-list-online', message);
    }

    identifyUser() {
        this.socket = io(AppSetting.BASE_SERVER_URL);
        console.log('connect')
    }

    showNotification(type, message) {
        // const type = ['','info','success','warning','danger'];

        // const color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "notifications",
            message: message

        },{
            type: type,
            timer: 4000,
            placement: {
                from: 'top',
                align: 'right'
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
        });
    }
}
