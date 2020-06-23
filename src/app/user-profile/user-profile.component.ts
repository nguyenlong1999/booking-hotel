import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/shared/service/user.service.';
import { User } from 'app/shared/model/user';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppSetting } from 'app/appsetting';
import { FileUploader } from 'ng2-file-upload';
import { MustMatch } from 'app/shared/helper/must-match-validator';
// import { ImageUpload } from '../shared/animation/image/image.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
@Component({ selector: '[]' })
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  changePasswordForm: FormGroup;
  userObject: {
    id: '',
    email: '',
    name: '',
    birthday: '',
    gender: '',
    materialStatus: '',
    signature: '',
    introduction: ''
  };
  genders = [
    { value: 0, viewValue: 'Nam' },
    { value: 1, viewValue: 'Nữ' },
    { value: 2, viewValue: 'Không xác định' }
  ];
  materials = [
    { value: 0, viewValue: 'Đã ly hôn' },
    { value: 1, viewValue: 'Đã kết hôn' },
    { value: 2, viewValue: 'Đang yêu' },
    { value: 3, viewValue: 'Chưa có người yêu' }
  ];
  userPassObject = {
    user: '',
    password: '',
    newPassword: ''
  }
  years: number[] = [];
  uploader: FileUploader;
  imageProp: String = "profile";
  id: any;
  url: any;
  user: User;
  // imageUrl: any;
  TabIndex = 0;
  submitted = false;
  passSubmitted = false;
  constructor(
    private userService: UserService,
    private cookies: CookieService,
    private formBuilder: FormBuilder,
  ) {
    this.profileForm = this.formBuilder.group({
      id: [''],
      email: [''],
      name: [''],
      birthday: [''],
      gender: [''],
      materialStatus: [''],
      signature: [''],
      introduction: ['']
    });
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit() {
    this.changePassword();
    this.getAllYear();
    let email = this.cookies.get('email');
    if (email !== '') {
      this.userService.getMemberInfo(email).subscribe(user => {
        if (user !== undefined) {
          this.user = user;
          console.log(this.user);
          let name = this.user.name
          if (name === undefined) {
            name = ''
          }
          let birthday = this.user.birthday
          if (this.user.birthday === undefined) {
            birthday = 1999;
          }
          let gender = this.user.gender
          user = undefined;
          if (gender === undefined) {
            gender = 2
          }
          let materialStatus = this.user.materialStatus
          if (materialStatus === undefined) {
            materialStatus = '1'
          }
          let signature = this.user.signature
          if (signature === undefined) {
            signature = ''
          }
          let introduction = this.user.introduction
          if (introduction === undefined) {
            introduction = ''
          }

          // this.imageUrl = this.user.imageUrl;
          if (this.user.imageUrl !== undefined) {
            this.url = this.user.imageUrl;
          }
          this.profileForm.controls['id'].patchValue(this.user._id);
          this.profileForm.controls['email'].patchValue(this.user.email);
          this.profileForm.controls['name'].patchValue(name);
          this.profileForm.controls['birthday'].patchValue(birthday);
          this.profileForm.controls['gender'].patchValue(gender);
          this.profileForm.controls['materialStatus'].patchValue(parseInt(materialStatus));
          this.profileForm.controls['signature'].patchValue(signature);
          this.profileForm.controls['introduction'].patchValue(introduction);
          console.log(this.profileForm.value);
        }
      });
    }
  }
  message: String;
  changePassword() {
    this.passSubmitted = true;
    if (this.changePasswordForm.invalid) {
      this.message = 'Không để trống các trường mật khẩu';
      // const radio: HTMLElement = document.getElementById('modal-button2');
      // radio.click();
      return;
    }
    // this.loading = true;
    let email = this.cookies.get('email');
    this.userPassObject = this.changePasswordForm.value;
    this.userPassObject.user = email

    // this.userPassObject.email = email;
    // con
    // this.userService.changePassword(this.userPassObject)
    //   .subscribe(data => {
    //     console.log(data)
    //     const status = data.body['status']
    //     if (status === 200) {
    //       this.message = data.body['message']
    //       const radio: HTMLElement = document.getElementById('modal-button2');
    //       radio.click();
    //       setTimeout(() => {
    //         // this.loading = false;
    //         window.location.reload()
    //         // this.chatService.identifyUser();
    //       }, 3000);
    //     } else {
    //       // this.loading = false;
    //       // this.errorPassMessage = data.body['message']
    //     }
    //   })
  }

  // onSelectFile(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]); // read file as data url
  //     reader.onload = (event) => { // called once readAsDataURL is completed
  //       this.url = event.target.result;
  //     }
  //   }
  //   console.log(this.uploader.queue);
  //   this.uploader.uploadAll();
  // }

  getAllYear() {
    let temp = parseInt(new Date().getFullYear().toString()) - 4;

    for (let i = 0; i < 100; i++) {
      let year = (temp - i);
      this.years.push(year)
    }

  }
}
