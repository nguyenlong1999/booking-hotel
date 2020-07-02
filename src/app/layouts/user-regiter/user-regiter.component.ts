import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm, ReactiveFormsModule} from '@angular/forms';
import {MustMatch} from 'app/shared/helper/must-match-validator';
import {LoginServiceService} from 'app/shared/service/login-service.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-user-regiter',
    templateUrl: './user-regiter.component.html',
    styleUrls: ['./user-regiter.component.css']
})
export class UserRegiterComponent implements OnInit {
    registerForm: FormGroup;
    submitted: boolean;
    userObj: {
        name: '',
        email: '',
        password: ''
    };
    errorMessage: String;
    message: string = null;


    constructor(
        private formBuilder: FormBuilder,
        private _loginService: LoginServiceService,
        private _router: Router,
    ) {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    get f() {
        return this.registerForm.controls;
    }

    ngOnInit() {
        this.submitted = false;
    }

    registerUser() {
        this.submitted = true;
        this.userObj = this.registerForm.value;
        if (this.registerForm.invalid || this.userObj.name.trim() == '') {
            this.errorMessage = 'Bạn hãy kiểm tra lại thông tin!'
            return;
        }
        this._loginService.registerUser(this.userObj).subscribe((data) => {
            const result = data.body
            if (result['status'] === 200) {
                this.message = result['message'];
                const radio: HTMLElement = document.getElementById('modal-button20');
                radio.click();
                setTimeout(() => {
                    this._router.navigate(['/']);
                }, 5000);
            } else if (result['status'] !== 200) {
                this.errorMessage = result['message'];
            } else if (data.body['status'] !== 200) {
                this.errorMessage = data.body['message'];
            } else if (data.body['status'] === 404) {
                this.errorMessage = data.body['message'];
            } else {
                this.errorMessage = data.body['message'];
            }
        });
    }
}
