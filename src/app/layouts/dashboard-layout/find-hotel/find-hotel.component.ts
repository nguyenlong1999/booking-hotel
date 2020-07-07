import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-find-hotel',
    templateUrl: './find-hotel.component.html',
    styleUrls: ['./find-hotel.component.css']
})
export class FindHotelComponent implements OnInit {

    constructor(private cookie: CookieService,
    ) {
    }

    ngOnInit(): void {
        let arr = JSON.parse(this.cookie.get('searchText'));
        console.log(arr)

    }

}
