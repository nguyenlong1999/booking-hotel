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
    totaltypeRoomNumber = 0;
    maxDayNumber = 0;
    countAccommodates = 0;
    countBedrooms = 0;
    countBathrooms = 0;
    isDisable = true;
    private address;
    lat = 0;
    lng = 0;
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
            reservationTime: [''],
            maxDay: [''],
        })
    }

    ngOnInit(): void {
        console.log(this.address);
    }


    onRatingChanged(rating) {
        console.log(this.address);
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
            accommodates: this.formbuilder.control(''),
            bathRooms: this.formbuilder.control('0'),
            bedRooms: this.formbuilder.control('0'),
            bedRoomsDetails: this.formbuilder.array([]),
            bedTypedual: this.formbuilder.control(''),
            bedTypeSingle: this.formbuilder.control('')
        });
    }

    deleteControlRoom() {
        console.log(this.formArrayRoomNumber.length);
        this.formArrayRoomNumber.removeAt(this.formArrayRoomNumber.length - 1);
    }

    addControlArrayTypeBedroom(i) {
        console.log('thêm loại giường ngủ')
        return this.formbuilder.group({
            arrayTypeBedRooms: this.formbuilder.array([
                this.addControlTypeBedroom()
            ])
        })
    }

    plusAddTypeBedRoom(i, iz) {

        const control = ((<FormArray>this.registerHotelForm.controls['formArrayRoomNumber']).at(i).get('bedRoomsDetails') as FormArray)
            .at(iz).get('arrayTypeBedRooms') as FormArray;
        control.push(this.addControlTypeBedroom());
    }

    addControlTypeBedroom() {
        return this.formbuilder.group({
            bedType: this.formbuilder.control(''),
            bedQuantity: this.formbuilder.control('')
        })
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

    minusMaxDay() {
        this.maxDayNumber--;
    }

    plusMaxDay() {
        this.maxDayNumber++;
    }

    minusTotalRoomNumber() {
        this.totaltypeRoomNumber--;
        this.deleteControlRoom();
    }

    plusTotalRoomNumber() {
        this.totaltypeRoomNumber++;
        this.formArrayRoomNumber.push(this.addControlRoom());
    }


    plusNumberOfBedrooms(i) {
        this.countBedrooms = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bedRooms').value
        this.countBedrooms++
        this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bedRooms').setValue(this.countBedrooms)

        // form multiple
        const control = (<FormArray>this.registerHotelForm.controls['formArrayRoomNumber']).at(i).get('bedRoomsDetails') as FormArray;
        control.push(this.addControlArrayTypeBedroom(i));
    }

    minusNumberOfBedrooms(i) {
        this.countBedrooms = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bedRooms').value
        this.countBedrooms--
        this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bedRooms').setValue(this.countBedrooms)

        // this.formArrayRoomNumber.removeAt(this.formArrayRoomNumber.at(i).get('bedRoomsDetails') as .length - 1);

        const control = (<FormArray>this.registerHotelForm.controls['formArrayRoomNumber']).at(i).get('bedRoomsDetails') as FormArray;
        control.removeAt(i);

    }

    plusNumberOfBathrooms(i) {
        this.countBathrooms = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bathRooms').value
        this.countBathrooms++
        this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bathRooms').setValue(this.countBathrooms)
    }

    minusNumberOfBathrooms(i) {
        this.countBathrooms = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bathRooms').value
        this.countBathrooms--
        this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bathRooms').setValue(this.countBathrooms)

    }

    plusAccommodates(i) {
        this.countAccommodates = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('accommodates').value
        this.countAccommodates++
        this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('accommodates').setValue(this.countAccommodates)
    }

    minusAccommodates(i) {
        this.countAccommodates = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('accommodates').value
        this.countAccommodates--;
        this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('accommodates').setValue(this.countAccommodates)
    }

    // get address
    getEstablishmentAddress(place: object) {
        this.address = place['formatted_address'];
        // this.lat = place.geometry.location.lat();
        // this.lng = place.geometry.location.lng()
        console.log(this.lat)
        console.log(this.lng)
        console.log(place)
    }

}
