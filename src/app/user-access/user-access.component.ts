import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/shared/service/user.service.';
import { User } from 'app/shared/model/user';
import { CookieService } from 'ngx-cookie-service';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.css']
})
export class UserAccessComponent implements OnInit {
  users: User[] = [];
  config: any;
  userObject = {
    role: 0,
    id: '',
  };
  key: any;
  admin: boolean = false;
  message: string = '';
  imageUrl: String;
  user: User;
  openMember = false;
  updateMember = false;
  messageModal = false;
  disableAdmin = true;
  pageSize = 10;
  loading = false;
  constructor(
    private userService: UserService,
    private cookies: CookieService,
  ) { }

  ngOnInit() {
    this.getUser();
    let role = this.cookies.get('role');
    if (parseInt(role) > 1) {
      this.admin = true;
    }
  }

  getUser() {
    this.userService.getUsers().subscribe(users => {
      if (users === undefined) {
        return;
      }
      this.users = users;
      this.imageUrl = '../../assets/img/booking.png';
      for (let user of this.users) {
        if (user.imageUrl === undefined) {
          user.imageUrl = '../../assets/img/booking.png';
        }
        user.isAdmin === false;
        if (user.role === -1) {
          user.role = 'Chưa xác thực';
        } else if (user.role === 0) {
          user.role = 'Thành viên';
        } else if (user.role === 1) {
          user.role = 'Quản trị';
          user.isAdmin === true;
        } else if (user.role > 1) {
          user.isAdmin === true;
          user.role = 'Admin';
        } else {
          user.role = 'Khóa';
        }
        let userAccess = user;
        this.users = this.users.filter(use => use._id !== userAccess._id);

        this.users.push(user);
      }
      this.users.sort((a, b) => {
        if (a.totalPoint > b.totalPoint) {
          return -1;
        } else if (a.totalPoint < b.totalPoint) {
          return 1;
        } else {
          return 0;
        }
      });

      for (let i = 0; i < this.users.length; i++) {
        let user = this.users[i];
        user.id = i + 1;
      }
      this.loading = true
    });
  }

  openModal(user: any, openMemberValue: any, updateMember: any) {
    this.user = user;

    this.messageModal = false;
    if (updateMember === 0) {
      this.updateMember = false;
    }
    if (openMemberValue === true) {
      this.openMember = true;
      this.message = 'Bạn muốn mở khóa tài khoản này ?';
    } else if (openMemberValue === false) {
      this.openMember = false;
      this.message = 'Bạn muốn khóa tài khoản này ?';
    }
    if (updateMember === true) {
      this.updateMember = true;
      this.message = 'Bạn muốn phân quyền tài khoản này ?';
    }
    console.log(user.role);
    if (user.role === 'Admin') {
      this.messageModal = true;
      this.updateMember = false;
      this.message = 'Tài khoản chủ website không thay đổi được quyền!';
    } else if (user.role === 'Quản trị' && this.cookies.get('role') === '1') {
      this.messageModal = true;
      this.updateMember = false;
      this.message = 'Bạn không có quyền khóa tài khoản của quản trị viên !';
    }
    // if (this.message === '') {
    //   this.message = 'Bạn muốn cập nhật tài khoản này?'
    // }
    const radio: HTMLElement = document.getElementById('modal-button222');
    radio.click();
  }

  // pageChanged(event) {
  //   this.config.currentPage = event;
  // }

  // keyUp() {
  //   console.log(this.pageSize)
  //   if (this.searchText.length > 2) {
  //     this.pageSize = this.users.length;
  //     this.pageChanged(1);
  //   } else {
  //     this.pageSize = 10;
  //   }
  // }

  // updateRole(user: any) {
  //   if (user.warningReport === 0) {
  //     this.userObject.role = 1;
  //   } else {
  //     this.userObject.role = 0;
  //   }
  //   this.userObject.id = user._id;
  //   this.userService.updateRole(this.userObject).subscribe(data => {
  //     if (data.body['status'] === 200) {
  //       user = data.body['user'];
  //       for (let userAccess of this.users) {
  //         if (userAccess.email === user.email) {
  //           userAccess = user;
  //           this.users = this.users.filter(user => user._id !== userAccess._id);
  //           if (user.role === -1) {
  //             user.role = 'Chưa xác thực';
  //           } else if (user.role === 0) {
  //             user.role = 'Thành viên';
  //           } else if (user.role === 1) {
  //             user.role = 'Quản trị';
  //             user.isAdmin === true;
  //           } else if (user.role > 1) {
  //             user.isAdmin === true;
  //             user.role = 'Admin';
  //           } else {
  //             user.role = 'Khóa';
  //           }
  //           user.id = this.users.length + 1;
  //           if (user.imageUrl === undefined) {
  //             user.imageUrl = 'jbiajl3qqdzshdw0z749';
  //           }
  //           this.users.push(user);
  //           this.messageModal = true;
  //           if (this.userObject.role === 0) {
  //             this.message = 'Hạ quyền quản trị viên thành công';
  //           } else {
  //             this.message = 'Thêm quản trị viên thành công';
  //           }

  //           setTimeout(() => {
  //             this.message = '';
  //             const radio: HTMLElement = document.getElementById('close-button');
  //             radio.click();
  //           }, 2000);
  //         }
  //       }
  //     }
  //   });
  // }

  // bannedUser(user: any) {
  //   console.log('ban user');
  //   this.userObject.id = user._id;
  //   this.userService.bannedUser(this.userObject).subscribe(data => {
  //     if (data.body['status'] === 200) {
  //       user = data.body['user'];
  //       for (let userAccess of this.users) {
  //         if (userAccess.email === user.email) {
  //           userAccess = user;
  //           this.users = this.users.filter(user => user._id !== userAccess._id);
  //           if (user.imageUrl === undefined) {
  //             user.imageUrl = 'jbiajl3qqdzshdw0z749';
  //           }
  //           if (user.role === -1) {
  //             user.role = 'Chưa xác thực';
  //           } else if (user.role === 0) {
  //             user.role = 'Thành viên';
  //           } else if (user.role === 1) {
  //             user.role = 'Quản trị';
  //           } else if (user.role > 1) {
  //             user.role = 'Admin';
  //           } else {
  //             user.role = 'Khóa';
  //           }
  //           user.id = this.users.length + 1;
  //           this.users.push(user);
  //           this.messageModal = true;
  //           this.message = 'Khóa thành viên thành công';
  //           setTimeout(() => {
  //             const radio: HTMLElement = document.getElementById('close-button');
  //             radio.click();
  //           }, 2000);
  //         }
  //       }
  //     }
  //   });
  // }

  // activeMember(user: any) {
  //   console.log('active user');
  //   this.userObject.id = user._id;
  //   this.userService.openUser(this.userObject).subscribe(data => {
  //     if (data.body['status'] === 200) {
  //       user = data.body['user'];
  //       for (let userAccess of this.users) {
  //         if (userAccess.email === user.email) {
  //           userAccess = user;
  //           this.users = this.users.filter(user => user._id !== userAccess._id);
  //           if (user.imageUrl === undefined) {
  //             user.imageUrl = 'jbiajl3qqdzshdw0z749';
  //           }
  //           if (user.role === -1) {
  //             user.role = 'Chưa xác thực';
  //           } else if (user.role === 0) {
  //             user.role = 'Thành viên';
  //           } else if (user.role === 1) {
  //             user.role = 'Quản trị';
  //           } else if (user.role > 1) {
  //             user.role = 'Admin';
  //           } else {
  //             user.role = 'Khóa';
  //           }
  //           user.id = this.users.length + 1;
  //           this.users.push(user);
  //           this.messageModal = true;
  //           this.message = 'Mở khóa thành viên thành công';
  //           setTimeout(() => {
  //             this.message = '';
  //             const radio: HTMLElement = document.getElementById('close-button');
  //             radio.click();
  //           }, 2000);
  //         }
  //       }
  //     }
  //     console.log(data.body['status'])
  //   });
  // }
}
