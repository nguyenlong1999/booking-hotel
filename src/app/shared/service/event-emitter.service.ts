import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from 'rxjs/internal/Subscription';

@Injectable({
    providedIn: 'root'
})
export class EventEmitterService {

    invokeFirstComponentFunction = new EventEmitter();
    subsVar: Subscription;

    constructor() {
    }

    onFirstComponentButtonClick(language) {
        this.invokeFirstComponentFunction.emit(language);
    }

    onCallLogin() {
        this.invokeFirstComponentFunction.emit();
    }
}
