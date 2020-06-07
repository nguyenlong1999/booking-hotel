import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';
import {AppSetting} from '../../appsetting';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    constructor(private socket: Socket) { }
    public sendMessage(message) {
        console.log('gưi thong báo socket' + message)
        this.socket.emit('new-message', message);
    }
    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('message', (message) => {
                observer.next(message);
            });
        });
    }
    identifyUser() {
        this.socket = io(AppSetting.BASE_SERVER_URL);
        console.log('connect')
    }
}
