import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IndexLayoutComponent} from '../dashboard-layout/index-layout/index-layout.component';
import {SearchHotel} from '../../shared/model/search-hotel';

@Component({
    selector: 'app-choose-room-type-dialog',
    templateUrl: './choose-room-type-dialog.component.html',
    styleUrls: ['./choose-room-type-dialog.component.scss']
})
export class ChooseRoomTypeDialogComponent implements OnInit {
    searchHotel: SearchHotel;
    checkAlone = false;
    checkPair = false;
    checkFamily = false;
    checkGroup = false;
    checkJob = false;
    openCount = false;
    childrenCheck = false;
    @Output() searchHotelOutPut = new EventEmitter<any>();
    output = [];

    constructor(
        public dialogRef: MatDialogRef<IndexLayoutComponent>
        ,
        @Inject(MAT_DIALOG_DATA) public data: SearchHotel
    ) {
        console.log(this.data)
        this.searchHotel = this.data['searchHotel']
    }

    ngOnInit(): void {
    }

    checkIndex(index) {
        console.log(index)
        this.refreshCheck();
        if (index === 1) {
            this.checkAlone = true;
            this.searchHotel.personCount = 1;
            this.searchHotel.roomCount = 1;
            this.searchHotel.childrenCount = 0;
        } else if (index === 2) {
            this.checkPair = true;
            this.searchHotel.personCount = 2;
            this.searchHotel.roomCount = 1;
            this.searchHotel.childrenCount = 0;
        } else if (index === 3) {
            this.checkFamily = true;
            this.openCount = true;
            this.searchHotel.personCount = 2;
            this.searchHotel.roomCount = 1;
            this.searchHotel.childrenCount = 1;
            this.childrenCheck = true;
        } else if (index === 4) {
            this.checkGroup = true;
            this.openCount = true;
            this.searchHotel.personCount = 2;
            this.searchHotel.roomCount = 1;
            this.searchHotel.childrenCount = 1;
            this.childrenCheck = true;
        } else {
            this.checkJob = true;
            this.openCount = true;
            this.searchHotel.personCount = 1;
            this.searchHotel.roomCount = 1;
            this.searchHotel.childrenCount = 0;
            this.childrenCheck = false;
        }
    }

    refreshCheck() {
        this.checkJob = false;
        this.checkGroup = false;
        this.checkFamily = false;
        this.checkAlone = false;
        this.checkPair = false;
        this.openCount = false;
        this.childrenCheck = false;
    }

    onCloseDialogNoData() {
        this.dialogRef.close();
    }

    onCloseDialog() {
        console.log(this.searchHotel)
        const cloneInput = Object.assign({}, this.searchHotel);
        this.output.push(cloneInput);
    }

    addRoomCount() {
        this.searchHotel.roomCount = this.searchHotel.roomCount + 1;
        this.searchHotel.personCount = this.searchHotel.roomCount;
    }

    removeRoomCount() {
        if (this.searchHotel.roomCount > 1) {
            this.searchHotel.roomCount = this.searchHotel.roomCount - 1;
        }
        if (this.searchHotel.roomCount === 1) {
            this.searchHotel.childrenCount = 1;
            this.searchHotel.personCount = 1;
        }
    }

    addPersonCount() {
        this.searchHotel.personCount = this.searchHotel.personCount + 1;
    }

    removePersonCount() {
        if (this.searchHotel.personCount > 0) {
            this.searchHotel.personCount = this.searchHotel.personCount - 1;
        }
    }

    addChildCount() {
        this.searchHotel.childrenCount = this.searchHotel.childrenCount + 1;
    }

    removeChildCount() {
        if (this.searchHotel.childrenCount > 0) {
            this.searchHotel.childrenCount = this.searchHotel.childrenCount - 1;
        }
    }
}
