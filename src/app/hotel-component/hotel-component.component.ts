import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HotelService} from '../shared/service/hotel.service.';
import {Hotel} from '../shared/model/hotel';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';

@Component({
    selector: 'app-hotel-component',
    templateUrl: './hotel-component.component.html',
    styleUrls: ['./hotel-component.component.css']
})
export class HotelComponentComponent implements OnInit, AfterViewInit {
    hotels: Hotel[] = []
    displayedColumns = ['id', 'user', 'name', 'sqm', 'add'];


    dataSource: MatTableDataSource<Hotel>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private  hotelService: HotelService, private route: Router) {
    }

    async ngOnInit() {
        await this.getHotel();
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    ngAfterViewInit() {

    }

    onClickEditRow(row_id) {
        console.log(row_id)
    }

    getHotel(): Promise<any> {
        return this.hotelService.getHotels().toPromise().then(hotels => {
                console.log(hotels)
                if (hotels === undefined) {
                    return;
                }
                this.hotels = hotels;
                this.dataSource = new MatTableDataSource(this.hotels)
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        )
    }


}
