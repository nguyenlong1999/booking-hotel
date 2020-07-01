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
    hotels: Hotel[] = [];
    hotelss: Hotel[] = [];
    displayedColumns = ['id', 'user', 'name', 'address', 'starHotel', 'sqm', 'totalRoom', 'approval', 'block', 'add'];
    typeHotel = 0;

    dataSource: MatTableDataSource<Hotel>;
    hehe: MatTableDataSource<Hotel>
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private  hotelService: HotelService, private route: Router) {
    }

    async ngOnInit() {
        await this.getHotel(1);
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

    onChange(event) {
        console.log(this.typeHotel);
    }

    getHotel(status: number): Promise<any> {
        return this.hotelService.getHotels().toPromise().then(hotels => {
                console.log(hotels)
                if (hotels === undefined) {
                    return;
                }
                for (let item of hotels) {
                    if (item.status === status) {
                        this.hotels.push(item);
                    } else {
                        this.hotelss.push(item)
                    }
                }
                this.hehe = new MatTableDataSource(this.hotelss);
                this.hehe.paginator = this.paginator;
                this.hehe.sort = this.sort;
                this.dataSource = new MatTableDataSource(this.hotels)
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        )
    }


}
