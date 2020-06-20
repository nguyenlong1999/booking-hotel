import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MustMatch } from 'app/shared/helper/must-match-validator';
import { LoginServiceService } from 'app/shared/service/login-service.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  errorMessage: string = null;
  registerForm: FormGroup;
  submitted = false;
  message: string = null;
  userObject = {
    name: "",
    email: "",
    password: "",
  }

  confirmPass: string = ""
  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private _loginService: LoginServiceService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }

  registerUser() {
    console.log('submit');
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.errorMessage = 'Đăng kí không thành công';
      return;
    }
    if (this.userObject.name.trim() !== "" && this.userObject.password.trim() !== ""
      && this.userObject.email.trim() !== "" && (this.userObject.password.trim() === this.confirmPass))
      console.log(this.userObject);
    this._loginService.registerUser(this.userObject).subscribe((data) => {
      const result = data.body
      if (result['status'] === 200) {
        this.message = result['message'];
        // const radio: HTMLElement = document.getElementById('modal-button20');
        // radio.click();
        setTimeout(() => {
          this._router.navigate(['/']);
        }, 5000);
      } else if (result['status'] !== 200) {
        this.errorMessage = result['message'];
      }
    });
  }
}
