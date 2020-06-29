import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { Observable } from 'rxjs';
import {ChooseRoomTypeDialogComponent} from "../../choose-room-type-dialog/choose-room-type-dialog.component";

@Component({
  selector: 'app-index-layout',
  templateUrl: './index-layout.component.html',
  styleUrls: ['./index-layout.component.scss']
})
export class IndexLayoutComponent implements OnInit {
  private address;
  constructor(
      public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
  }
  getEstablishmentAddress(place: object) {
    this.address = place['formatted_address'];
  }
  openDialogChooseHotelType(event): Observable<any> {
    const dialogRef = this.dialog.open(ChooseRoomTypeDialogComponent, {
      width: '40vw',
      maxWidth: '40vw',
      height: '60vh',
      maxHeight: '60vh',
      position: {top: '360px'},
      // data: { billLadingDetail, index, billPackageTransport: this.billPackageTransport },
    });
    return dialogRef.afterClosed();
  }
}
