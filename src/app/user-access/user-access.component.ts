import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {UserService} from 'app/shared/service/user.service.';
import {User} from 'app/shared/model/user';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {ChatService} from '../shared/service/chat.service';

export interface DialogData {
    action: any;
    messageDialog: string;
}

@Component({
    selector: 'app-user-access',
    templateUrl: './user-access.component.html',
    styleUrls: ['./user-access.component.css']
})
export class UserAccessComponent implements OnInit {
    public users: User[] = [];
    public displayedColumns = ['id', 'avatar', 'name', 'phone', 'email', 'role', 'actionRole', 'block', 'add'];
    public dataSource: MatTableDataSource<User>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    userObject = {
        role: 0,
        id: '',
    };
    actionObject = {
        actionName: '',
        user: User
    };
    config: any;
    key: any;
    admin = false;
    message = '';
    user: User;
    loading = false;

    constructor(
        private userService: UserService,
        private cookies: CookieService,
        private dialog: MatDialog,
        private route: Router,
        private chatService: ChatService
    ) {
    }

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
            this.dataSource = new MatTableDataSource(this.users)
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            // this.imageUrl = '../../assets/img/booking.png';
            for (let user of this.users) {
                if (user.imageUrl === undefined) {
                    user.imageUrl = 'default-avatar.png';
                }
                user.isAdmin === false;
                if (user.role === -1) {
                    user.role = 'Chưa xác thực';
                } else if (user.role === 0) {
                    user.role = 'Thành viên';
                } else if (user.role === 1) {
                    user.role = 'Quản trị KS';
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

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    openDialog(user: any, actionValue: any) {
        this.actionObject.user = user;
        if (actionValue === 0 && user.role !== 'Admin') {
            this.actionObject.actionName = 'Hạ cấp';
            this.message = 'Bạn muốn hạ cấp tài khoản này?';
        } else if (actionValue === 1 && user.role !== 'Admin') {
            this.message = 'Bạn muốn phân quyền quản trị cho tài khoản này?';
            this.actionObject.actionName = 'Quản trị';
        } else if (actionValue === 2 && user.role !== 'Admin') {
            this.message = 'Bạn muốn khóa tài khoản này?';
            this.actionObject.actionName = 'Khóa';
        } else if (actionValue === 3 && user.role !== 'Admin') {
            this.message = 'Bạn muốn mở khóa tài khoản này?';
            this.actionObject.actionName = 'Mở khóa';
        } else if (user.role === 'Admin') {
            this.message = 'Bạn không có quyền khóa, thay đổi quyền của tài khoản ADMIN';
            this.actionObject.actionName = 'ADMIN';
        }
        const dialogRef = this.dialog.open(UserRoleDialog, {
            width: '500px',
            data: {
                messageDialog: this.message,
                action: this.actionObject
            }
        })

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result) {
                if (result.actionName === 'Hạ cấp' || result.actionName === 'Quản trị') {
                    console.log('func- quan tri');
                    this.updateRole(result.user);
                } else if (result.actionName === 'Khóa') {
                    console.log('func- khoa');
                    this.bannedUser(result.user);
                } else if (result.actionName === 'Mở khóa') {
                    console.log('func- mo khoa');
                    this.openUser(result.user);
                }
            } else {
                console.log('hello bấy bề');
            }
        });
    }

    updateRole(user: any) {
        this.userObject.role = user.role === 'Quản trị KS' ? 0 : 1;
        this.userObject.id = user._id;
        this.userService.updateRole(this.userObject).subscribe(data => {
            if (data.body['status'] === 200) {
                user = data.body['user'];
                for (let userAccess of this.users) {
                    if (userAccess.email === user.email) {
                        userAccess = user;
                        this.users = this.users.filter(user => user._id !== userAccess._id);
                        if (user.role === -1) {
                            user.role = 'Chưa xác thực';
                        } else if (user.role === 0) {
                            user.role = 'Thành viên';
                        } else if (user.role === 1) {
                            user.role = 'Quản trị KS';
                            user.isAdmin === true;
                        } else if (user.role > 1) {
                            user.isAdmin === true;
                            user.role = 'Admin';
                        } else {
                            user.role = 'Khóa';
                        }
                        user.id = this.users.length + 1;
                        if (user.imageUrl === undefined) {
                            user.imageUrl = 'default-avatar.png';
                        }
                        this.users.push(user);
                        // this.messageModal = true;
                        if (this.userObject.role === 0) {
                            this.message = 'Hạ quyền quản trị viên thành công';
                            this.chatService.showNotification('success', this.message);
                        } else {
                            this.message = 'Thêm quản trị viên thành công';
                            this.chatService.showNotification('success', this.message);
                        }
                        console.log(this.message)
                        setTimeout(() => {
                            this.message = '';
                            // const radio: HTMLElement = document.getElementById('close-button');
                            // radio.click();
                        }, 1000);
                    }
                }
            } else {
                this.message = 'Phân quyền không thành công';
                this.chatService.showNotification('warning', this.message);
            }
        });
    }

    bannedUser(user: any) {
        console.log('ban user');
        this.userObject.id = user._id;
        this.userService.bannedUser(this.userObject).subscribe(data => {
            if (data.body['status'] === 200) {
                user = data.body['user'];
                for (let userAccess of this.users) {
                    if (userAccess.email === user.email) {
                        userAccess = user;
                        this.users = this.users.filter(user => user._id !== userAccess._id);
                        if (user.imageUrl === undefined) {
                            user.imageUrl = 'default-avatar.png';
                        }
                        if (user.role === -1) {
                            user.role = 'Chưa xác thực';
                        } else if (user.role === 0) {
                            user.role = 'Thành viên';
                        } else if (user.role === 1) {
                            user.role = 'Quản trị KS';
                        } else if (user.role > 1) {
                            user.role = 'Admin';
                        } else {
                            user.role = 'Khóa';
                        }
                        user.id = this.users.length + 1;
                        this.users.push(user);
                        this.message = 'Khóa thành viên thành công';
                        this.chatService.showNotification('success', this.message);
                    }
                }
            } else {
                this.message = 'Khóa thành viên không thành công';
                this.chatService.showNotification('warning', this.message);
            }
        });
    }

    openUser(user: any) {
        console.log('active user');
        this.userObject.id = user._id;
        this.userService.openUser(this.userObject).subscribe(data => {
            if (data.body['status'] === 200) {
                user = data.body['user'];
                for (let userAccess of this.users) {
                    if (userAccess.email === user.email) {
                        userAccess = user;
                        this.users = this.users.filter(user => user._id !== userAccess._id);
                        if (user.imageUrl === undefined) {
                            user.imageUrl = 'default-avatar.png';
                        }
                        if (user.role === -1) {
                            user.role = 'Chưa xác thực';
                        } else if (user.role === 0) {
                            user.role = 'Thành viên';
                        } else if (user.role === 1) {
                            user.role = 'Quản trị KS';
                        } else if (user.role > 1) {
                            user.role = 'Admin';
                        } else {
                            user.role = 'Khóa';
                        }
                        user.id = this.users.length + 1;
                        this.users.push(user);
                        this.message = 'Mở khóa thành viên thành công';
                        this.chatService.showNotification('success', this.message);
                        // this.route.getCurrentNavigation();
                    }
                }
            } else {
                this.message = 'Mở khóa thành viên không thành công';
                this.chatService.showNotification('warning', this.message);
            }
            console.log(data.body['status'])
        });
    }
}

@Component({
    selector: 'app-dialog-user-role',
    templateUrl: 'dialog-user-role.html',
    styleUrls: ['./user-access.component.css']
})
export class UserRoleDialog {
    constructor(
        public dialogRef: MatDialogRef<UserRoleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
