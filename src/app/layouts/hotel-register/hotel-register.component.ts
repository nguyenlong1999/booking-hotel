import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StarRatingColor} from '../../shared/animation/star-rating/star-rating.component';

@Component({
    selector: 'app-hotel-register',
    templateUrl: './hotel-register.component.html',
    styleUrls: ['./hotel-register.component.scss']
})
export class HotelRegisterComponent implements OnInit {
    registerHotelForm: FormGroup;
    totalBedRoom: FormArray;
    totalRoomNumber = 0
    accommodates = 0
    numberOfBathrooms = 0
    numberOfBedrooms = 0

    // rating
    rating = 3;
    starCount = 5;
    starColor: StarRatingColor = StarRatingColor.accent;
    starColorP: StarRatingColor = StarRatingColor.primary;
    starColorW: StarRatingColor = StarRatingColor.warn;

    // selected tab
    public TabIndex = 3;

    public tabNext() {
        const tabCount = 4;
        this.TabIndex = (this.TabIndex + 1) % tabCount;
    }

    constructor(private formbuilder: FormBuilder) {
        this.registerHotelForm = this.formbuilder.group({
            name: [''],
            sqm: [''],
            desHotel: [''],
            suggestPlayground: [''],
            rulerHotel: [''],
            guideToHotel: [''],
            starHotel: [''],
            image: [''],
            totalRoomNumber: [''],

            // tab 2
            address: [''],
            country: [''],
            province: [''],
            city: [''],
            zip: [''],

            // tab 3
            // Facilities
            facilities: this.formbuilder.group({
                television: this.formbuilder.control(''),
                internet: this.formbuilder.control('')
            }),

            // tab 4 Thông tin phòng Room detail array và priceExtra + extra-person
            formArrayRoomNumber: this.formbuilder.array([
                this.addControlRoom()
            ]),
            totalBedRoom: this.formbuilder.array([
                this.addControlTotalBedRoom()
            ])
        })
    }

    ngOnInit(): void {
        // this.totalBedRoom = this.registerHotelForm.get('totalBedRoom') as FormArray;

    }


    onRatingChanged(rating) {
        this.rating = rating;
    }

    get f() {
        return this.registerHotelForm.controls;
    }

    get formArrayRoomNumber() {
        return this.registerHotelForm.get('formArrayRoomNumber') as FormArray
    }

    onSubmit() {

    }

    addControlRoom() {
        return this.formbuilder.group({
            accommodates: this.formbuilder.control('')
        });
    }

    deleteControlRoom() {
        this.formArrayRoomNumber.removeAt(this.formArrayRoomNumber.length - 1);
    }

    addControlFacilities() {
        console.log('facilities nè')
        return this.formbuilder.group({
            television: this.formbuilder.control(''),
            internet: this.formbuilder.control('')

        })
    }

    addControlTotalBedRoom() {
        console.log('x')
        return this.formbuilder.group({
            test: this.formbuilder.control('')
        });
    }

    minusTotalRoomNumber() {
        this.totalRoomNumber--;
        this.deleteControlRoom();
    }

    plusTotalRoomNumber() {
        this.totalRoomNumber++;
        this.formArrayRoomNumber.push(this.addControlRoom());
    }


    plusNumberOfBedrooms() {
        this.numberOfBedrooms++;
    }

    minusNumberOfBedrooms() {
        this.numberOfBedrooms--;
    }

    plusNumberOfBathrooms() {
        this.numberOfBathrooms++;
    }

    minusNumberOfBathrooms() {
        this.numberOfBathrooms--;
    }

    plusAccommodates(i) {
        console.log(i);
        // document.getElementById('accommodates' + i).set
        this.accommodates++;
    }

    minusAccommodates(i) {
        console.log(i);
        this.accommodates--;
    }

}
