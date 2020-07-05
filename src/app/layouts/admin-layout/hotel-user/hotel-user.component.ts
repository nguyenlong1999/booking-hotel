import {Component, OnInit, ViewChild} from '@angular/core';
import {Hotel} from '../../../shared/model/hotel';
import {StarRatingColor} from '../../../shared/animation/star-rating/star-rating.component';
import {AbstractControl, FormBuilder} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HotelService} from '../../../shared/service/hotel.service.';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {ChatService} from '../../../shared/service/chat.service';

@Component({
    selector: 'app-hotel-user',
    templateUrl: './hotel-user.component.html',
    styleUrls: ['./hotel-user.component.css']
})
export class HotelUserComponent implements OnInit {
    hotels: Hotel[] = [];
    actionObject = {
        actionName: '',
        hotel: Hotel
    };
    updateStatusObject = {
        actionName: '',
        idUser: '',
        idHotel: ''
    }
    rating = 3;
    starCount = 5;
    starColor: StarRatingColor = StarRatingColor.primary;
    message = '';
    displayedColumns = ['id', 'name', 'address', 'starHotel', 'sqm', 'totalRoom', 'status', 'add'];
    selectListApproval: string[] = ['Chưa duyệt', 'Hoạt động', 'Đã khóa'];
    selectListStarhotel: any[] = [
        {title: '1 sao', value: 1},
        {title: '2 sao', value: 2},
        {title: '3 sao', value: 3},
        {title: '4 sao', value: 4},
        {title: '5 sao', value: 5}
    ];

    readonly formControl: AbstractControl;
    dataSource: MatTableDataSource<Hotel>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private hotelService: HotelService,
                private route: Router,
                private formBuilder: FormBuilder,
                private dialog: MatDialog,
                private cookies: CookieService,
                private chatService: ChatService) {
        this.formControl = formBuilder.group({
            name: [''],
            email: [''],
            address: [''],
            status: [''],
            starHotel: ['']
        })
        const id = this.cookies.get('ObjectId');
        this.hotelService.getHotelsByUser(id).subscribe(hotels => {
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
                console.log(item.status);
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
                const filter = {...value, name: value.name.trim().toLowerCase()} as string;
                // console.log(filter);
                this.dataSource.filter = filter;
            });
        });
    }

    ngOnInit(): void {

    }

}
