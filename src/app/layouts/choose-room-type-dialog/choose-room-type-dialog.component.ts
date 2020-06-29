import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IndexLayoutComponent} from "../dashboard-layout/index-layout/index-layout.component";

@Component({
  selector: 'app-choose-room-type-dialog',
  templateUrl: './choose-room-type-dialog.component.html',
  styleUrls: ['./choose-room-type-dialog.component.scss']
})
export class ChooseRoomTypeDialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<IndexLayoutComponent>
      // ,
      // @Inject(MAT_DIALOG_DATA) public data: BillCycleModel
  ) { }

  ngOnInit(): void {
  }
  onCloseDialogNoData(){
    this.dialogRef.close();
  }
}
