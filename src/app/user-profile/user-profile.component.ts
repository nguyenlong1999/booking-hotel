import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/shared/service/user.service.';
import { User } from 'app/shared/model/user';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
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
  years: number[] = [];
  id: any;
  url: any;
  user: User;
  yearr: 1950;
  // email: String;
  imageUrl: String = 'jbiajl3qqdzshdw0z749';
  constructor(
    private userService: UserService,
    private cookies: CookieService,
    private formBuilder: FormBuilder
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
  }

  ngOnInit() {
    this.getMemerInfo();
    this.getAllYear();
  }
  getMemerInfo() {
    let email = this.cookies.get('email');
    this.userService.getMemberInfo(email).subscribe(user => {
      this.user = user;
      this.id = user._id;
      console.log(this.id)
      this.profileForm.controls['id'].patchValue(user._id);
      this.profileForm.controls['email'].patchValue(user.email);
      this.profileForm.controls['name'].patchValue(user.name);
      this.profileForm.controls['birthday'].patchValue(user.birthday);
      this.profileForm.controls['gender'].patchValue(user.gender);
      this.profileForm.controls['materialStatus'].patchValue(user.materialStatus);
      this.profileForm.controls['signature'].patchValue(user.signature);
      this.profileForm.controls['introduction'].patchValue(user.introduction);
      console.log(this.profileForm.value);
      if (user !== undefined) {
        this.user = user;
        if (user.imageUrl !== '') {
          this.imageUrl = user.imageUrl
        }
      }
    })
  }

  updateProfile() {
    console.log('submit');
    this.userObject = this.profileForm.value;
    this.userService.updateUser(this.userObject).subscribe(user => {
      const status = user.body['status']
      console.log(status)
      if (status === 200) {
        console.log(user)
        if (this.user.signature !== undefined) {
          this.user.signature = atob(this.user.signature)
        }
        console.log(this.user.signature);
      }
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  getAllYear() {
    let temp = parseInt(new Date().getFullYear().toString()) - 4;

    for (let i = 0; i < 100; i++) {
      let year = (temp - i);
      this.years.push(year)
    }

  }
}
