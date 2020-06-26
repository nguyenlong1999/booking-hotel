import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HotelService} from '../shared/service/hotel.service.';
import {Hotel} from '../shared/model/hotel';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-hotel-component',
    templateUrl: './hotel-component.component.html',
    styleUrls: ['./hotel-component.component.css']
})
export class HotelComponentComponent implements OnInit, AfterViewInit {
    hotels: Hotel[] = []
    displayedColumns = ['id', 'name', 'progress', 'color'];


    dataSource: MatTableDataSource<Hotel>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private  hotelService: HotelService) {
    }

    ngOnInit(): void {
        this.getHotel()
        this.dataSource = new MatTableDataSource(this.hotels)

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    getHotel() {
        this.hotelService.getHotels().subscribe(hotels => {
            if (hotels === undefined) {
                return;
            }
            this.hotels = hotels
        })
    }

}
