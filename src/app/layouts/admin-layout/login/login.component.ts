import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'
import {LoginServiceService} from '../../../shared/service/login-service.service';
import {CookieService} from 'ngx-cookie-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChatService} from '../../../shared/service/chat.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    registerForm: FormGroup;
    tfaFlag = false;
    userObject = {
        email: '',
        password: ''
    };
    submitted = false;
    errorMessage: string = null;
    login_check = true;

    constructor(
        private cookie: CookieService,
        private _loginService: LoginServiceService,
        private _router: Router,
        private formBuilder: FormBuilder,
        private chatService: ChatService
    ) {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get f() {
        return this.registerForm.controls;
    }

    ngOnInit() {

    }

    forget_password() {
        this.login_check = !this.login_check;
    }

    loginUser() {
        console.log('log in ')
        this.submitted = true;
        this.userObject = this.registerForm.value;
        // console.log(this.userObject)
        this._loginService.loginAdmin(this.userObject).subscribe((data) => {
            this.errorMessage = null;
            if (data.body['status'] === 200) {

                let user = data.body;
                let role;
                let token;
                let users;
                let objectId;
                for (let key in user) {
                    if (key === 'user') {
                        users = user[key];
                        // console.log(user);
                        token = users.token;
                        // console.log(users.token)
                    } else if (key === 'role') {
                        role = user[key];
                        // console.log(role);

                    } else if (key === 'objectId') {
                        objectId = user[key];
                        // console.log(objectId);
                    }

                }
                if (role === -1) {
                    this.errorMessage = 'Bạn chưa xác thực email đã đăng ký';
                    return;
                }
                if (role < 1) {
                    console.log('member')
                    this.errorMessage = 'Bạn không có thẩm quyền truy cập';
                    console.log('log in fail ')
                    return;

                } else {
                    this.cookie.set('token', token);
                    this.cookie.set('role', role);
                    sessionStorage.setItem('token', token);
                    this.cookie.set('isAuthenicate', 'true');
                    this.cookie.set('email', this.userObject.email);
                    this.cookie.set('ObjectId', objectId);
                    sessionStorage.setItem('user', this.userObject.email);
                    this._loginService.updateAuthStatus(true);
                    console.log('log in ');
                    this.chatService.identifyUser();
                    this._router.navigateByUrl('/dashboard');
                }


            } else {
                console.log('log in fail ')
            }
            if (data.body['status'] === 206) {
                this.tfaFlag = true;
            }
            if (data.body['status'] !== 200) {
                this.errorMessage = data.body['message'];
            }
            if (data.body['status'] === 404) {
                this.errorMessage = data.body['message'];
            } else {
                this.errorMessage = data.body['message'];
            }

        })
    }

    getNewPassword() {

    }
}
