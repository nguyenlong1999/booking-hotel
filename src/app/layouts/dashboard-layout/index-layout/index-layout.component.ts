import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Observable} from 'rxjs';
import {ChooseRoomTypeDialogComponent} from "../../choose-room-type-dialog/choose-room-type-dialog.component";
import {SearchHotel} from "../../../shared/model/search-hotel";

@Component({
    selector: 'app-index-layout',
    templateUrl: './index-layout.component.html',
    styleUrls: ['./index-layout.component.scss']
})
export class IndexLayoutComponent implements OnInit {
    private address;
    searchHotel = new SearchHotel('', 1, 1, 1);

    constructor(
        public dialog: MatDialog,
    ) {

    }

    ngOnInit() {
        this.searchHotel.total='Thông tin phòng'
    }

    getEstablishmentAddress(place: object) {
        this.address = place['formatted_address'];
    }

    openDialogChooseHotelType(event){

      this.ShowDialogChooseHotelType(event).subscribe(data=>{

          let checkSearch= data[0];
          console.log(checkSearch);
          if(checkSearch!==undefined){
              this.searchHotel.total=checkSearch['roomCount']+ ' phòng, '+checkSearch['personCount']+ ' người lớn'
              if(checkSearch['childrenCount']!==undefined&& checkSearch['childrenCount']>0){
                  this.searchHotel.total = this.searchHotel.total +', '+ checkSearch['childrenCount']+ ' trẻ em';
              }
          }
      })
    }
    ShowDialogChooseHotelType(event): Observable<any> {

        const dialogRef = this.dialog.open(ChooseRoomTypeDialogComponent, {
            width: '40vw',
            maxWidth: '40vw',
            height: '45vh',
            maxHeight: '45vh',
            position: {top: '360px'},
            data: {searchHotel: this.searchHotel},
        });
        return dialogRef.afterClosed();
    }
}
