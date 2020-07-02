import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../shared/service/user.service.';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
    id: string;
    message: string = null;

    constructor(private route: ActivatedRoute,
                private cookie: CookieService,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.activeMember()
    }

    activeMember() {
        this.id = this.route.snapshot.params.id;
        console.log(this.id);
        this.userService.activeMember(this.id).subscribe(data => {
            this.message = data['message'];
        })

    }

}
