import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HotelService} from '../shared/service/hotel.service.';
import {Hotel} from '../shared/model/hotel';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder} from '@angular/forms';

export interface PeriodicElement {
    status: string;
    starHotel: number;
    // weight: number;
    // symbol: string;
}

@Component({
    selector: 'app-hotel-component',
    templateUrl: './hotel-component.component.html',
    styleUrls: ['./hotel-component.component.css']
})
export class HotelComponentComponent implements OnInit, AfterViewInit {
    hotels: Hotel[] = [];
    displayedColumns = ['id', 'user', 'name', 'address', 'starHotel', 'sqm', 'totalRoom', 'status', 'active', 'block', 'add'];
    selectListApproval: string[] = ['Chưa duyệt', 'Hoạt động'];
    selectListStarhotel: string[] = [
        {}
    ];
    selectListStarhotel: string[] = ['Chưa duyệt', 'Hoạt động'];

    readonly formControl: AbstractControl;
    dataSource: MatTableDataSource<Hotel>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private hotelService: HotelService,
        private route: Router,
        private formBuilder: FormBuilder
    ) {
        this.formControl = formBuilder.group({
            status: [''],
            starHotel: [''],
            // symbol: '',
        })
        this.hotelService.getHotels().subscribe(hotels => {
            console.log(hotels)
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
                } else {
                    item.status = 'Hoạt động';
                }
                item.starHotel = item.starHotel + ' sao';
            }
            this.dataSource = new MatTableDataSource(this.hotels)
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataSource.filterPredicate = ((data, filter) => {
                console.log(data.status)
                const a = !filter.status || data.status.toLowerCase() === filter.status;
                const b = !filter.starHotel || data.starHotel.includes(filter.starHotel);
                // const c = !filter.symbol || data.symbol.toLowerCase().includes(filter.symbol);
                return a && b;
            }) as (PeriodicElement, string) => boolean;
            this.formControl.valueChanges.subscribe(value => {
                const filter = {...value, status: value.status.trim().toLowerCase()} as string;
                console.log(filter);
                this.dataSource.filter = filter;
            });
        });
    }

    async ngOnInit() {
    }

    // applyFilter(filterValue: string) {
    //     // filterValue = filterValue.trim(); // Remove whitespace
    //     // filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    //     const filter = {...filterValue, status: filterValue.status.trim().toLowerCase()} as string;
    //     this.dataSource.filter = filter;
    // }
    //
    // selectStage(event) {
    //     console.log(event);
    //     this.applyFilter(event.value);
    // }

    ngAfterViewInit() {

    }

    onClickEditRow(row_id) {
        console.log(row_id)
    }

    // onChange(event) {
    //     console.log(this.typeHotel);
    // }

}
