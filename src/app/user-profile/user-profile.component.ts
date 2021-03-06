import {Component, OnInit} from '@angular/core';
import {UserService} from 'app/shared/service/user.service.';
import {User} from 'app/shared/model/user';
import {CookieService} from 'ngx-cookie-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
import {MustMatch} from 'app/shared/helper/must-match-validator';
import {ChatService} from '../shared/service/chat.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
    profileForm: FormGroup;
    changePasswordForm: FormGroup;
    userObject: {
        id: '',
        email: '',
        name: '',
        phone: '',
        address: '',
        birthday: '',
        gender: '',
        materialStatus: '',
        signature: '',
        introduction: '',
        imageUrl: ''
    };
    genders = [
        {value: 0, viewValue: 'Nam'},
        {value: 1, viewValue: 'Nữ'},
        {value: 2, viewValue: 'Không xác định'}
    ];
    materials = [
        {value: '0', viewValue: 'Đã ly hôn'},
        {value: '1', viewValue: 'Đã kết hôn'},
        {value: '2', viewValue: 'Đang yêu'},
        {value: '3', viewValue: 'Chưa có người yêu'}
    ];
    userPassObject = {
        user: '',
        password: '',
        newPassword: ''
    }
    years: number[] = [];
    uploader: FileUploader;
    imageProp: String = 'profile';
    id: any;
    url: any;
    user: User;
    // imageUrl: any;
    TabIndex = 0;
    submitted = false;
    passSubmitted = false;
    message: String;
    errorPassMessage: String;

    constructor(
        private userService: UserService,
        private cookies: CookieService,
        private formBuilder: FormBuilder,
        private chatService: ChatService,
        private route: Router,
    ) {
        this.profileForm = this.formBuilder.group({
            id: [''],
            email: [''],
            name: [''],
            phone: [''],
            address: [''],
            birthday: [''],
            gender: [''],
            materialStatus: [''],
            signature: [''],
            introduction: [''],
            imageUrl: ['']
        });
        this.changePasswordForm = this.formBuilder.group({
            user: [''],
            oldPassword: ['', [Validators.required, Validators.minLength(6)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    ngOnInit() {
        // this.changePassword();
        this.getAllYear();
        const id = this.cookies.get('ObjectId');
        if (id) {
            this.userService.getMemberInfo(id).subscribe(user => {
                console.log('get User data:');
                // console.log(user);
                if (user !== undefined) {
                    this.user = user;
                    let name = this.user.name
                    if (name === undefined) {
                        name = ''
                    }
                    let phone = this.user.phone
                    if (phone === undefined) {
                        phone = ''
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
                    if (this.user.imageUrl !== undefined || this.user.imageUrl === '') {
                        this.url = 'http://localhost:8000/api/images/' + this.user.imageUrl;
                    } else {
                        this.url = 'http://localhost:8000/api/images/default-avatar.png'
                    }
                    this.profileForm.controls['id'].patchValue(this.user._id);
                    this.profileForm.controls['email'].patchValue(this.user.email);
                    this.profileForm.controls['email'].disable();
                    this.profileForm.controls['name'].patchValue(name);
                    this.profileForm.controls['phone'].patchValue(phone);
                    this.profileForm.controls['address'].patchValue(this.user.address);
                    this.profileForm.controls['birthday'].patchValue(birthday);
                    this.profileForm.controls['gender'].patchValue(gender);
                    this.profileForm.controls['materialStatus'].patchValue(materialStatus);
                    this.profileForm.controls['signature'].patchValue(signature);
                    this.profileForm.controls['introduction'].patchValue(introduction);
                    this.profileForm.controls['imageUrl'].patchValue(this.user.imageUrl);
                }
            });
        }
    }

    get f() {
        return this.changePasswordForm.controls;
    }

    updateProfile() {
        console.log('submit');
        this.userObject = this.profileForm.value;
        this.userService.updateUser(this.userObject).subscribe(user => {
            const status = user.body['status']
            if (status === 200) {
                if (this.user.signature !== undefined) {
                    this.user.signature = atob(this.user.signature)
                }
                this.message = 'Cập nhật tài khoản thành công!';
                this.chatService.showNotification('success', this.message);
                setTimeout(() => {
                    this.message = '';
                    this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                        this.route.navigate(['/user-profile']);
                    });
                }, 1500);
            } else {
                this.chatService.showNotification('warning', user.body['message']);
            }
        });
    }

    changePassword() {
        this.passSubmitted = true;
        if (this.changePasswordForm.invalid) {
            this.message = 'Không để trống các trường mật khẩu';
            return;
        }
        // this.loading = true;
        const email = this.cookies.get('email');
        this.userPassObject = this.changePasswordForm.value;
        this.userPassObject.user = email;
        this.userService.changePassword(this.userPassObject)
            .subscribe(data => {
                const status = data.body['status'];
                if (status === 200) {
                    this.message = data.body['message'];
                    this.chatService.showNotification('success', this.message);
                    setTimeout(() => {
                        this.message = '';
                        window.location.reload();
                    }, 1500);
                } else {
                    // this.loading = false;
                    this.errorPassMessage = data.body['message'];
                    this.chatService.showNotification('warning', this.errorPassMessage);
                }
            })
    }

    getAllYear() {
        const temp = parseInt(new Date().getFullYear().toString()) - 4;
        for (let i = 0; i < 100; i++) {
            const year = (temp - i);
            this.years.push(year)
        }
    }

    getImageSrc(event: any) {
        const imageRes = JSON.parse(event)
        this.profileForm.controls['imageUrl'].patchValue(imageRes.filePath);
    }
}
