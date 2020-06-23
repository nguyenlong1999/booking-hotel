import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {StarRatingColor} from '../shared/animation/star-rating/star-rating.component';
import {last} from 'rxjs/operators';

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
    imageProp = 'hotelAccess';
    starColor: StarRatingColor = StarRatingColor.accent;
    starColorP: StarRatingColor = StarRatingColor.primary;
    starColorW: StarRatingColor = StarRatingColor.warn;
    arrayImage = '';

    // type bed rooms
    lstTypeBedRoom = [
        {
            value: 1,
            name: 'Giường đôi'
        },
        {
            value: 2,
            name: 'Giường đơn'
        },
        {
            value: 3,
            name: 'Giường King'
        },
        {
            value: 4,
            name: 'Giường Queen'
        }

    ]

    // selected tab
    public TabIndex = 2;

    // đồng ý điều khoản
    checked = false;
    isCheckAfterSubmit = false;

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
            // province: [''],
            // city: [''],
            zip: [''],

            // tab 3
            // Facilities
            facilities: this.addControlFacilities(),

            // tab 4 Thông tin phòng Room detail array và priceExtra + extra-person
            formArrayRoomNumber: this.formbuilder.array([
                // this.addControlRoom()
            ]),
            reservationTime: [''],
            cancellationPolicy: ['']

        })
    }

    public tabNext() {
        const tabCount = 5;
        this.TabIndex = (this.TabIndex + 1) % tabCount;
    }

    public tabPrevios() {
        const tabCount = 5;
        this.TabIndex = (this.TabIndex - 1) % tabCount;
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


    get formArrayRoomNumber() {
        return this.registerHotelForm.get('formArrayRoomNumber') as FormArray
    }

    onSubmit() {
        if (this.checked === false) {
            console.log('xxxxxx')
            this.isCheckAfterSubmit = true;
            return
        }

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
            airConditional: this.formbuilder.control(''),
            Hairdryer: this.formbuilder.control(''),
            ironingMachine: this.formbuilder.control(''),
            television: this.formbuilder.control(''),
            cableTelevision: this.formbuilder.control(''),
            freeWifi: this.formbuilder.control(''),
            freeInternet: this.formbuilder.control(''),
            washingMachine: this.formbuilder.control(''),
            Shampoo: this.formbuilder.control(''),
            beddingSet: this.formbuilder.control(''),
            TowelsOfAllKinds: this.formbuilder.control(''),
            smartKey: this.formbuilder.control(''),

            wifiCharge: this.formbuilder.control(''),
            internetCharge: this.formbuilder.control(''),


            wheelchairAccessible: this.formbuilder.control(''),
            elevatorInHotel: this.formbuilder.control(''),
            wirelessBell: this.formbuilder.control(''),
            doorStaff: this.formbuilder.control(''),

            teaMaker: this.formbuilder.control(''),
            coffee: this.formbuilder.control(''),
            tea: this.formbuilder.control(''),
            Kitchen: this.formbuilder.control(''),
            freeBreakfast: this.formbuilder.control(''),
            workspace: this.formbuilder.control(''),
            privatePool: this.formbuilder.control(''),
            heaters: this.formbuilder.control(''),
            Dryer: this.formbuilder.control(''),
            Fireplace: this.formbuilder.control(''),
            Wardrobe: this.formbuilder.control(''),
            indooPool: this.formbuilder.control(''),
            hotTub: this.formbuilder.control(''),
            gymRoom: this.formbuilder.control(''),
            outdoorSwimmingPool: this.formbuilder.control(''),
            freeParking: this.formbuilder.control(''),

            SmokeDetector: this.formbuilder.control(''),
            COAlarmSensor: this.formbuilder.control(''),
            FirstAidKit: this.formbuilder.control(''),
            fireExtinguisher: this.formbuilder.control(''),

            Smoking: this.formbuilder.control(''),
            petsAllowed: this.formbuilder.control('')

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
        // console.log(this.lat)
        // console.log(this.lng)
        // console.log(place);
        // console.log(this.name);
        // console.log(place['formatted_address']);
        // console.log(place['formatted_address'].split(',').pop());
        // console.log(place['formatted_address'].split(',').slice(0, -2)[2])
        // this.registerHotelForm.get('province').setValue(place['formatted_address'].split(',').slice(0, -2)[2])

        this.registerHotelForm.get('address').setValue(this.name)
        this.registerHotelForm.get('country').setValue(place['formatted_address'].split(',').pop())
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

    changeValueAccept(value) {
        this.checked = !value;
        this.isCheckAfterSubmit = false
        console.log(this.checked)
    }

}
