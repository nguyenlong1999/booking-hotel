import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StarRatingColor} from '../shared/animation/star-rating/star-rating.component';
import {last} from 'rxjs/operators';
import {LoginServiceService} from '../shared/service/login-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HotelService} from '../shared/service/hotel.service.';
import {CookieService} from 'ngx-cookie-service';

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
    isEdited = false
    lat = 19.973349;
    lng = 105.468750;
    successMessage = '';
    listImgCurrent = [];
    a = [];
    // rating
    rating = 3;
    starCount = 5;
    imageProp = 'hotelAccess';
    starColor: StarRatingColor = StarRatingColor.accent;
    starColorP: StarRatingColor = StarRatingColor.primary;
    starColorW: StarRatingColor = StarRatingColor.warn;
    arrayImage = '';
    isNext = false;
    isNext1 = false;
    isSubmitted = false;
    errorMessage: String;
    tab2 = true;
    tab3 = true;
    tab4 = true;
    tab5 = true;


    listRadioCancel = [{name: 'room.flexiblev1', value: 1, checked: true},
        {name: 'room.Strictv1', value: 2, checked: false}];
    listMatButton = [
        {
            name: 'room.Anytime', value: 1
        },
        {
            name: 'room.Ayear', value: 2
        },
        {
            name: 'room.SixMonth', value: 3
        },
        {
            name: 'room.ThreeMonth', value: 4
        }
    ]

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
    public TabIndex = 0;

    // đồng ý điều khoản
    checked = false;

    constructor(private formbuilder: FormBuilder,
                private _hotelService: HotelService,
                private _router: Router,
                private cookies: CookieService,
                private route: ActivatedRoute
    ) {
        this.registerHotelForm = this.formbuilder.group({
            name: ['', [Validators.required]],
            sqm: ['', [Validators.pattern(/^[0-9]\d*$/)]],
            desHotel: ['', [Validators.required]],
            suggestPlayground: [''],
            rulerHotel: [''],
            guideToHotel: ['', [Validators.required]],
            starHotel: [''],
            image: [''],
            totalRoomNumber: '1',
            status: 0, // 0 inActive 1: Active

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
            reservationTime: '',
            cancellationPolicy: ['']
        })
        this.plusTotalRoomNumber();

        if (this.route.snapshot.paramMap.get('id')) {
            this.isEdit(this.route.snapshot.paramMap.get('id'))
            this.isEdited = true
        }
    }

    public changeTabValid(event: any) {
        this.isNext = true
        if (event.index === 1) { // validate form 1
            this.tab2 = true;
            if (this.registerHotelForm.controls['name'].invalid || this.registerHotelForm.controls['desHotel'].invalid
                || this.registerHotelForm.controls['guideToHotel'].invalid) {
                this.TabIndex = 0;
                this.tab3 = true
                this.tab4 = true
                this.tab5 = true
                return;
            }
            this.tab2 = false
        }
        if (event.index === 2) {
            this.tab3 = false
        }
        if (event.index === 3) {
            console.log('xxx')
            this.tab4 = false
        }
        if (event.index === 4) {
            this.isNext1 = true
            this.tab5 = false
        }
    }

    public tabNext() {
        const radio: HTMLElement = document.getElementById('scroll-to-top');
        radio.click();
        const tabCount = 5;
        this.TabIndex = (this.TabIndex + 1) % tabCount;

    }

    public tabPrevios() {
        const radio: HTMLElement = document.getElementById('scroll-to-top');
        radio.click();
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

    get nameHotel() {
        return this.registerHotelForm.get('name');
    }

    get sqm() {
        return this.registerHotelForm.get('sqm');
    }

    get formArrayRoomNumber() {
        return this.registerHotelForm.get('formArrayRoomNumber') as FormArray
    }

    isEdit(idObject) {
        this.registerHotelForm.reset();
        this._hotelService.getHotelById(idObject).subscribe(data => {
            const result = data;
            this.listImgCurrent = result[0][0].hotelObj.image.split(',');
            this.tab2 = false;
            this.tab3 = false;
            this.tab4 = false;
            this.tab5 = false;
            $('#totalRoomNumber').removeClass('disabledbutton');
            this.rating = result[0][0].hotelObj.starHotel;
            if (result[0][0].hotelObj.cancellationPolicy === 1) {
                this.listRadioCancel = [{name: 'room.flexiblev1', value: 1, checked: true},
                    {name: 'room.Strictv1', value: 2, checked: false}]
            } else {
                this.listRadioCancel = [{name: 'room.flexiblev1', value: 1, checked: false},
                    {name: 'room.Strictv1', value: 2, checked: true}]
            }


            this.registerHotelForm = this.formbuilder.group({
                id: result[0][0].hotelObj._id,
                name: result[0][0].hotelObj.name,
                sqm: result[0][0].hotelObj.sqm,
                address: result[0][0].hotelObj.address,
                country: result[0][0].hotelObj.country,
                image: result[0][0].hotelObj.image,
                starHotel: result[0][0].hotelObj.starHotel,
                desHotel: result[0][0].hotelObj.desHotel,
                suggestPlayground: result[0][0].hotelObj.suggestPlayground,
                guideToHotel: result[0][0].hotelObj.guideToHotel,
                reservationTime: result[0][0].hotelObj.reservationTime,
                rulerHotel: result[0][0].hotelObj.rulerHotel,
                cancellationPolicy: result[0][0].hotelObj.cancellationPolicy,
                totalRoomNumber: result[1][0].length,
                formArrayRoomNumber: this.formbuilder.array([]),
                facilities: this.formbuilder.group({
                    airConditional: this.formbuilder.control(result[0][0].airConditional),
                    Hairdryer: this.formbuilder.control(result[0][0].Hairdryer),
                    ironingMachine: this.formbuilder.control(result[0][0].ironingMachine),
                    television: this.formbuilder.control(result[0][0].television),
                    cableTelevision: this.formbuilder.control(result[0][0].cableTelevision),
                    freeWifi: this.formbuilder.control(result[0][0].freeWifi),
                    freeInternet: this.formbuilder.control(result[0][0].freeInternet),
                    washingMachine: this.formbuilder.control(result[0][0].washingMachine),
                    Shampoo: this.formbuilder.control(result[0][0].Shampoo),
                    beddingSet: this.formbuilder.control(result[0][0].beddingSet),
                    TowelsOfAllKinds: this.formbuilder.control(result[0][0].TowelsOfAllKinds),
                    smartKey: this.formbuilder.control(result[0][0].smartKey),

                    wifiCharge: this.formbuilder.control(result[0][0].wifiCharge),
                    internetCharge: this.formbuilder.control(result[0][0].internetCharge),

                    wheelchairAccessible: this.formbuilder.control(result[0][0].wheelchairAccessible),
                    elevatorInHotel: this.formbuilder.control(result[0][0].elevatorInHotel),
                    wirelessBell: this.formbuilder.control(result[0][0].wirelessBell),
                    doorStaff: this.formbuilder.control(result[0][0].doorStaff),

                    teaMaker: this.formbuilder.control(result[0][0].teaMaker),
                    coffee: this.formbuilder.control(result[0][0].coffee),
                    tea: this.formbuilder.control(result[0][0].tea),
                    Kitchen: this.formbuilder.control(result[0][0].Kitchen),
                    freeBreakfast: this.formbuilder.control(result[0][0].freeBreakfast),
                    workspace: this.formbuilder.control(result[0][0].workspace),
                    privatePool: this.formbuilder.control(result[0][0].privatePool),
                    heaters: this.formbuilder.control(result[0][0].heaters),
                    Dryer: this.formbuilder.control(result[0][0].Dryer),
                    Fireplace: this.formbuilder.control(result[0][0].Fireplace),
                    Wardrobe: this.formbuilder.control(result[0][0].Wardrobe),
                    indooPool: this.formbuilder.control(result[0][0].indooPool),
                    hotTub: this.formbuilder.control(result[0][0].hotTub),
                    gymRoom: this.formbuilder.control(result[0][0].gymRoom),
                    outdoorSwimmingPool: this.formbuilder.control(result[0][0].outdoorSwimmingPool),
                    freeParking: this.formbuilder.control(result[0][0].freeParking),

                    SmokeDetector: this.formbuilder.control(result[0][0].SmokeDetector),
                    COAlarmSensor: this.formbuilder.control(result[0][0].COAlarmSensor),
                    FirstAidKit: this.formbuilder.control(result[0][0].FirstAidKit),
                    fireExtinguisher: this.formbuilder.control(result[0][0].fireExtinguisher),

                    Smoking: this.formbuilder.control(result[0][0].Smoking),
                    petsAllowed: this.formbuilder.control(result[0][0].petsAllowed)

                }),

            })
            this.totaltypeRoomNumber = result[1][0].length;
            let z = 0;
            for (const i of result[1][0]) {
                this.formArrayRoomNumber.push(this.formbuilder.group({
                    accommodates: this.formbuilder.control(i.accommodates),
                    bathRooms: this.formbuilder.control(i.bathRooms),
                    bedRooms: this.formbuilder.control(i.bedRooms),
                    bedRoomsDetails: this.formbuilder.array([]),
                    maxDay: this.formbuilder.control(i.maxDay),
                    price: [i.price, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]]
                }));

                // xử lý push control array
                const control = (<FormArray>this.registerHotelForm.controls['formArrayRoomNumber'])
                    .at(z).get('bedRoomsDetails') as FormArray;
                let h = 0;
                for (const y of i.bedroomDetail) {
                    control.push(this.addControlArrayTypeBedroom(z));
                    const addTypebedRoom = ((<FormArray>this.registerHotelForm.controls['formArrayRoomNumber'])
                        .at(z).get('bedRoomsDetails') as FormArray)
                        .at(h).get('arrayTypeBedRooms') as FormArray;
                    for (const j of y.arrayTypeBedRooms) {
                        addTypebedRoom.push(this.formbuilder.group({
                            bedType: this.formbuilder.control(j.bedType),
                            bedQuantity: this.formbuilder.control(j.bedQuantity)
                        }))
                    }
                    h++
                }

                z++; // index

            }

        })

    }

    onSubmit() {
        if (this.checked === false) {
            this.isSubmitted = true
            return
        }
        if (this.listImgCurrent.length > 0) {
            let imgCurrent = Array.from(this.listImgCurrent).join();
            if (this.arrayImage.length > 0) {
                imgCurrent = imgCurrent + ',';
                this.arrayImage = imgCurrent.concat(this.arrayImage);
            }
        }
        this.registerHotelForm.get('image').setValue(this.arrayImage)
        this.registerHotelForm.get('totalRoomNumber').setValue(this.totaltypeRoomNumber)
        this.registerHotelForm.get('starHotel').setValue(this.rating)

        console.log(this.registerHotelForm.value);
        const hoTelsObject = this.registerHotelForm.value;
        hoTelsObject.email = this.cookies.get('email');

        if (this.isEdited) {
            console.log('vao day de edit')
            console.log(this.registerHotelForm.value);
            this._hotelService.editHotel(this.registerHotelForm.value).subscribe((data) => {
                const result = data.body
                console.log(result)
                if (result['status'] === 200) {
                    // this.successMessage = result['message'];
                    this.successMessage = result['message'];
                    const radio: HTMLElement = document.getElementById('modal-button');
                    radio.click();
                    setTimeout(() => {
                        // window.location.reload()
                        window.location.assign('/hotels')
                    }, 3000);
                }
            })

        } else {
            this._hotelService.createHotel(this.registerHotelForm.value).subscribe((data) => {
                const result = data.body
                console.log(result)
                if (result['status'] === 200) {
                    // this.successMessage = result['message'];
                    this.successMessage = result['message'];
                    const radio: HTMLElement = document.getElementById('modal-button');
                    radio.click();
                    setTimeout(() => {
                        // window.location.reload()
                        window.location.assign('/hotels')
                    }, 3000);
                } else if (result['status'] !== 200) {
                    this.errorMessage = result['message'];
                }
            })
        }
    }

    addControlRoom() {
        return this.formbuilder.group({
            accommodates: this.formbuilder.control('0'),
            bathRooms: this.formbuilder.control('0'),
            bedRooms: this.formbuilder.control('0'),
            order: this.formbuilder.control(this.totaltypeRoomNumber),
            bedRoomsDetails: this.formbuilder.array([]),
            maxDay: this.formbuilder.control('0'),
            price: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]]
        });
    }

    deleteControlRoom() {
        console.log(this.formArrayRoomNumber.length);
        this.formArrayRoomNumber.removeAt(this.formArrayRoomNumber.length - 1);
    }

    deleteControlBedRoomType(i, iz, ia) {
        const control = ((<FormArray>this.registerHotelForm.controls['formArrayRoomNumber']).at(i).get('bedRoomsDetails') as FormArray)
            .at(iz).get('arrayTypeBedRooms') as FormArray;
        control.removeAt(ia);
    }

    addControlArrayTypeBedroom(i) {
        console.log('thêm loại giường ngủ')
        return this.formbuilder.group({
            order: i,
            arrayTypeBedRooms: this.formbuilder.array([
                // this.addControlTypeBedroom() //k cho tự động add giường
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
            airConditional: this.formbuilder.control(false),
            Hairdryer: this.formbuilder.control(false),
            ironingMachine: this.formbuilder.control(false),
            television: this.formbuilder.control(false),
            cableTelevision: this.formbuilder.control(false),
            freeWifi: this.formbuilder.control(false),
            freeInternet: this.formbuilder.control(false),
            washingMachine: this.formbuilder.control(false),
            Shampoo: this.formbuilder.control(false),
            beddingSet: this.formbuilder.control(false),
            TowelsOfAllKinds: this.formbuilder.control(false),
            smartKey: this.formbuilder.control(false),

            wifiCharge: this.formbuilder.control(false),
            internetCharge: this.formbuilder.control(false),


            wheelchairAccessible: this.formbuilder.control(false),
            elevatorInHotel: this.formbuilder.control(false),
            wirelessBell: this.formbuilder.control(false),
            doorStaff: this.formbuilder.control(false),

            teaMaker: this.formbuilder.control(false),
            coffee: this.formbuilder.control(false),
            tea: this.formbuilder.control(false),
            Kitchen: this.formbuilder.control(false),
            freeBreakfast: this.formbuilder.control(false),
            workspace: this.formbuilder.control(false),
            privatePool: this.formbuilder.control(false),
            heaters: this.formbuilder.control(false),
            Dryer: this.formbuilder.control(false),
            Fireplace: this.formbuilder.control(false),
            Wardrobe: this.formbuilder.control(false),
            indooPool: this.formbuilder.control(false),
            hotTub: this.formbuilder.control(false),
            gymRoom: this.formbuilder.control(false),
            outdoorSwimmingPool: this.formbuilder.control(false),
            freeParking: this.formbuilder.control(false),

            SmokeDetector: this.formbuilder.control(false),
            COAlarmSensor: this.formbuilder.control(false),
            FirstAidKit: this.formbuilder.control(false),
            fireExtinguisher: this.formbuilder.control(false),

            Smoking: this.formbuilder.control(false),
            petsAllowed: this.formbuilder.control(false)

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
        if (this.totaltypeRoomNumber === 2) {
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
        console.log(i)
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
        const pshArrayImage = new Set()
        const str = '[' + event.toString().replace(/}\n?{/g, '},{') + ']';
        JSON.parse(str).forEach((obj) => {
            pshArrayImage.add(obj.filePath)
            // console.log(obj.filePath)
        });
        // console.log(pshArrayImage)
        // this.arrayImage = [...pshArrayImage].join(',')
        this.arrayImage = Array.from(pshArrayImage).join(',')
        // let evt = JSON.parse(event.toString());
        // this.arrayImage += evt.filePath + ','
        // event.path
    }

    getIndexDelete(event: any) {
        const arraySlice = this.arrayImage.split(',')
        arraySlice.splice(event, 1)
        this.arrayImage = arraySlice.toString();
    }

    changeValueAccept(value) {
        this.checked = !value;
        this.isSubmitted = false
    }

}
