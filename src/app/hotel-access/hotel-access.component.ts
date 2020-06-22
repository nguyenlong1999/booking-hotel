import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {StarRatingColor} from '../shared/animation/star-rating/star-rating.component';

@Component({
    selector: 'app-hotel-access',
    templateUrl: './hotel-access.component.html',
    styleUrls: ['./hotel-access.component.scss']
})
export class HotelAccessComponent implements OnInit {
    registerHotelForm: FormGroup;
    totaltypeRoomNumber = 0;
    countMaxDayNumber = 0;
    countAccommodates = 0;
    countBedrooms = 0;
    countBathrooms = 0;
    private address;
    private name;
    lat = 19.973349;
    lng = 105.468750;
    // rating
    rating = 3;
    starCount = 5;
    starColor: StarRatingColor = StarRatingColor.accent;
    starColorP: StarRatingColor = StarRatingColor.primary;
    starColorW: StarRatingColor = StarRatingColor.warn;
    arrayImage = '';

    // selected tab
    public TabIndex = 0;

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
            totalRoomNumber: '',

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
                // this.addControlRoom()
            ]),
            reservationTime: [''],
            cancellationPolicy: ['']

        })
    }

    public tabNext() {
        const tabCount = 4;
        this.TabIndex = (this.TabIndex + 1) % tabCount;
    }

    ngOnInit(): void {
        console.log(this.address);
    }

    onRatingChanged(rating) {
        this.rating = rating;
    }

    get f() {
        return this.registerHotelForm.controls;
    }

    onChange(deviceValue, index) {
        console.log(deviceValue, index);
        const radio: HTMLElement = document.getElementById('addMoreRoom' + index);
        radio.style.display = 'none';
    }

    get formArrayRoomNumber() {
        return this.registerHotelForm.get('formArrayRoomNumber') as FormArray
    }

    onSubmit() {
        this.registerHotelForm.get('image').setValue(this.arrayImage)
        this.registerHotelForm.get('totalRoomNumber').setValue(this.totaltypeRoomNumber)
        this.registerHotelForm.get('starHotel').setValue(this.rating)

        console.log(this.registerHotelForm.value);
    }

    addControlRoom() {
        return this.formbuilder.group({
            accommodates: this.formbuilder.control('0'),
            bathRooms: this.formbuilder.control('0'),
            bedRooms: this.formbuilder.control('0'),
            bedRoomsDetails: this.formbuilder.array([]),
            maxDay: this.formbuilder.control('0'),
            price: ['']
        });
    }

    deleteControlRoom() {
        console.log(this.formArrayRoomNumber.length);
        this.formArrayRoomNumber.removeAt(this.formArrayRoomNumber.length - 1);
    }

    deleteControlBedRoomType(i, iz, ia) {
        console.log(i)
        console.log(iz)
        console.log(ia)
        const control = ((<FormArray>this.registerHotelForm.controls['formArrayRoomNumber']).at(i).get('bedRoomsDetails') as FormArray)
            .at(iz).get('arrayTypeBedRooms') as FormArray;
        control.removeAt(ia);
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

    minusMaxDay(i) {
        if (this.countMaxDayNumber === 1) {
            $('#maxDay' + i).addClass('disabledbutton');
        }
        this.countMaxDayNumber = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('maxDay').value
        this.countMaxDayNumber--;
        this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('maxDay').setValue(this.countMaxDayNumber)
    }

    plusMaxDay(i) {
        $('#maxDay' + i).removeClass('disabledbutton');
        this.countMaxDayNumber = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('maxDay').value
        this.countMaxDayNumber++;
        this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('maxDay').setValue(this.countMaxDayNumber)

    }

    minusTotalRoomNumber() {
        console.log(this.totaltypeRoomNumber)
        if (this.totaltypeRoomNumber === 1) {
            $('#totalRoomNumber').addClass('disabledbutton');
        }
        this.totaltypeRoomNumber--;
        this.deleteControlRoom();
    }

    plusTotalRoomNumber() {
        $('#totalRoomNumber').removeClass('disabledbutton');
        this.totaltypeRoomNumber++;
        this.formArrayRoomNumber.push(this.addControlRoom());
    }


    plusNumberOfBedrooms(i) {
        $('#bedRooms' + i).removeClass('disabledbutton');
        this.countBedrooms = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bedRooms').value
        this.countBedrooms++
        this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bedRooms').setValue(this.countBedrooms)

        // form multiple
        const control = (<FormArray>this.registerHotelForm.controls['formArrayRoomNumber']).at(i).get('bedRoomsDetails') as FormArray;
        control.push(this.addControlArrayTypeBedroom(i));
    }

    minusNumberOfBedrooms(i) {
        if (this.countBedrooms === 1) {
            $('#bedRooms' + i).addClass('disabledbutton');
        }
        this.countBedrooms = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bedRooms').value
        this.countBedrooms--
        this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bedRooms').setValue(this.countBedrooms)

        const control = (<FormArray>this.registerHotelForm.controls['formArrayRoomNumber']).at(i).get('bedRoomsDetails') as FormArray;
        control.removeAt(i);

    }

    plusNumberOfBathrooms(i) {
        $('#bathRooms' + i).removeClass('disabledbutton');
        this.countBathrooms = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bathRooms').value
        this.countBathrooms++
        this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bathRooms').setValue(this.countBathrooms)
    }

    minusNumberOfBathrooms(i) {
        if (this.countBathrooms === 1) {
            $('#bathRooms' + i).addClass('disabledbutton');
        }
        this.countBathrooms = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bathRooms').value
        this.countBathrooms--
        this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('bathRooms').setValue(this.countBathrooms)

    }

    plusAccommodates(i) {
        $('#accommondates' + i).removeClass('disabledbutton');
        this.countAccommodates = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('accommodates').value
        this.countAccommodates++
        this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('accommodates').setValue(this.countAccommodates)
    }

    minusAccommodates(i) {
        if (this.countAccommodates === 1) {
            $('#accommondates' + i).addClass('disabledbutton');
        }

        this.countAccommodates = this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('accommodates').value
        this.countAccommodates--;
        this.registerHotelForm.get('formArrayRoomNumber').get([i]).get('accommodates').setValue(this.countAccommodates)
    }

    // get address
    getEstablishmentAddress(place: object) {
        this.address = place['formatted_address'];
        // this.lat = place.geometry.location.lat();
        // this.lng = place.geometry.location.lng()
        this.lat = place['geometry'].location.lat();
        this.lng = place['geometry'].location.lng();
        this.name = place['name'];
        console.log(this.lat)
        console.log(this.lng)
        console.log(place);
        console.log(this.name);
        document.getElementById('check-input').focus();
    }

    getImageSrc(event: any) {
        let pshArrayImage = new Set()
        const str = '[' + event.toString().replace(/}\n?{/g, '},{') + ']';
        JSON.parse(str).forEach((obj) => {
            pshArrayImage.add(obj.filePath)
           console.log(obj.filePath)
        });
        console.log(pshArrayImage)
        // this.arrayImage = [...pshArrayImage].join(',')
        this.arrayImage = Array.from(pshArrayImage).join(',')
        // let evt = JSON.parse(event.toString());
        // this.arrayImage += evt.filePath + ','
        // event.path
    }

}
