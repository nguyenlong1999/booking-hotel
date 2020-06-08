import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoginServiceService } from '../../../shared/service/login-service.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup
  tfaFlag: boolean = false
  userObject = {
    email: "",
    password: ""
  }
  submitted: boolean = false
  errorMessage: string = null
  constructor(private cookie: CookieService,
    private _loginService: LoginServiceService,
    private _router: Router,
    private formBuilder: FormBuilder) {
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


  loginUser() {
    console.log('log in ')
    this.submitted = true;
    this.userObject = this.registerForm.value;
    console.log(this.userObject)
    this._loginService.loginAdmin(this.userObject).subscribe((data) => {
      this.errorMessage = null;
      if (data.body['status'] === 200) {

        let user = data.body;
        let role;
        let token;
        let users;
        for (let key in user) {
          if (key === 'user') {
            users = user[key];
            console.log(user);
            token = users.token;
            console.log(users.token)
          } else if (key === 'role') {
            role = user[key];
            console.log(role);

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
          sessionStorage.setItem('user', this.userObject.email);
          this._loginService.updateAuthStatus(true);
          console.log('log in ')
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

}
