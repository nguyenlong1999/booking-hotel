import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HotelService } from '../shared/service/hotel.service.';
import { Hotel } from '../shared/model/hotel';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData, UserRoleDialog } from '../user-access/user-access.component';
import { User } from '../shared/model/user';
import { CookieService } from 'ngx-cookie-service';
import { ChatService } from '../shared/service/chat.service';
import { Message } from '../shared/model/message';
import { StarRatingColor } from "../shared/animation/star-rating/star-rating.component";

export interface PeriodicElement {
    name: string;
    email: string;
    address: string;
    status: string;
    starHotel: number;
}

@Component({
    selector: 'app-hotel-component',
    templateUrl: './hotel-component.component.html',
    styleUrls: ['./hotel-component.component.css']
})
export class HotelComponentComponent implements OnInit {
    hotels: Hotel[] = [];
    actionObject = {
        actionName: '',
        hotel: Hotel
    };
    messageObject = {
        objectId: '',
        message: ''
    }
    newMessageObject = {
        user: '',
        content: ''
    }
    updateStatusObject = {
        actionName: '',
        idUser: '',
        idHotel: ''
    }
    rating = 3;
    starCount = 5;
    starColor: StarRatingColor = StarRatingColor.primary;
    message = '';
    displayedColumns = ['id', 'user', 'name', 'address', 'starHotel', 'sqm', 'totalRoom', 'status', 'active', 'block', 'add'];
    selectListApproval: string[] = ['Chưa duyệt', 'Hoạt động', 'Đã khóa'];
    selectListStarhotel: any[] = [
        { title: '1 sao', value: 1 },
        { title: '2 sao', value: 2 },
        { title: '3 sao', value: 3 },
        { title: '4 sao', value: 4 },
        { title: '5 sao', value: 5 }
    ];

    readonly formControl: AbstractControl;
    dataSource: MatTableDataSource<Hotel>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private hotelService: HotelService,
        private route: Router,
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private cookies: CookieService,
        private chatService: ChatService
    ) {
        this.formControl = formBuilder.group({
            name: [''],
            email: [''],
            address: [''],
            status: [''],
            starHotel: ['']
        })
        this.hotelService.getHotels().subscribe(hotels => {
            // console.log(hotels);
            if (hotels === undefined) {
                return;
            }
            this.hotels = hotels;
            for (const item of this.hotels) {
                if (!item.status) {
                    item.status = 0;
                }
                if (item.status === 0) {
                    item.status = 'Chưa duyệt';
                } else if (item.status === 1) {
                    item.status = 'Hoạt động';
                } else if (item.isBlock === 0) {
                    item.status = 'Đã khóa';
                }
                // console.log(item.status);
            }
            this.dataSource = new MatTableDataSource(this.hotels)
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataSource.filterPredicate = ((data, filter) => {
                // console.log(data);
                const name = !filter.name || data.name.trim().toLowerCase().includes(filter.name);
                const email = !filter.email || data.user.email.trim().toLowerCase().includes(filter.email);
                const address = !filter.address || data.address.trim().toLowerCase().includes(filter.address);
                const status = !filter.status || data.status === filter.status;
                const starHotel = !filter.starHotel || data.starHotel === filter.starHotel;
                return name && email && address && status && starHotel;
            }) as (PeriodicElement, string) => boolean;
            this.formControl.valueChanges.subscribe(value => {
                const filter = { ...value, name: value.name.trim().toLowerCase() } as string;
                // console.log(filter);
                this.dataSource.filter = filter;
            });
        });
    }

    async ngOnInit() {
    }

    openDialog(hotel: any, actionValue: any) {
        this.actionObject.hotel = hotel;
        if (actionValue === 0 && hotel.status === 'Hoạt động') {
            this.actionObject.actionName = 'Bỏ duyệt';
            this.message = 'Bạn muốn bỏ duyệt khách sạn này?';
        } else if (actionValue === 1 && hotel.status === 'Chưa duyệt') {
            this.message = 'Bạn muốn duyệt khách sạn này?';
            this.actionObject.actionName = 'Duyệt';
        } else if (actionValue === 2 && hotel.isBlock === 1) {
            this.message = 'Bạn muốn khóa khách sạn này?';
            this.actionObject.actionName = 'Khóa';
        } else if (actionValue === 3 && hotel.isBlock === 0) {
            this.message = 'Bạn muốn mở khóa khách sạn này?';
            this.actionObject.actionName = 'Mở khóa';
        }
        // else if (hotel.user.role === 'Admin') {
        //     this.message = 'Bạn không có quyền khóa, thay đổi quyền của tài khoản ADMIN';
        //     this.actionObject.actionName = 'ADMIN';
        // }
        const dialogRef = this.dialog.open(HotelDialogComponent, {
            width: '500px',
            data: {
                messageDialog: this.message,
                action: this.actionObject
            }
        })

        dialogRef.afterClosed().subscribe(result => {
            // console.log(result);
            if (result) {
                this.updateStatusHotel(result.actionName, result.hotel);
            } else {
                console.log('Cancel');
            }
        });
    }
    onRatingChanged(rating) {
        this.rating = rating;
    }
    updateStatusHotel(actionName: any, hotel: any) {
        console.log('func-updateStatus');
        const idUser = this.cookies.get('ObjectId');
        const idHotel = hotel._id;
        this.updateStatusObject.idUser = idUser;
        this.updateStatusObject.idHotel = idHotel;
        this.updateStatusObject.actionName = actionName;
        this.hotelService.updateStatusHotel(this.updateStatusObject).subscribe(res => {
            if (res.body['status'] === 200) {
                this.messageObject.objectId = hotel.user._id;
                this.messageObject.message = res.body['message']['content'];
                this.message = res.body['messageAdmin']['content'];
                this.chatService.showNotification('success', this.message);
                this.chatService.sendMessage(this.messageObject);
                setTimeout(() => {
                    this.message = '';
                    // window.location.reload();
                    this.chatService.identifyUser();
                }, 1500);
            } else {
                this.chatService.showNotification('warning', res.body['message']);
            }
        });
    }

}

@Component({
    selector: 'app-dialog-hotel',
    templateUrl: 'dialog-hotel.html',
    styleUrls: ['./hotel-component.component.css']
})
export class HotelDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<HotelDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
