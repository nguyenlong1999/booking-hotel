import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ChatService} from '../../../shared/service/chat.service';
import {ChooseRoomTypeDialogComponent} from '../../choose-room-type-dialog/choose-room-type-dialog.component';
import {SearchHotel} from '../../../shared/model/search-hotel';
import {AppSetting} from '../../../appsetting';
import {FormBuilder, FormControl} from '@angular/forms';
import {LoginServiceService} from '../../../shared/service/login-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../shared/service/user.service.';
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie-service';
import {EventEmitterService} from '../../../shared/service/event-emitter.service';
import {map, startWith} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {HotelService} from '../../../shared/service/hotel.service.';

@Component({
    selector: 'app-index-layout',
    templateUrl: './index-layout.component.html',
    styleUrls: ['./index-layout.component.css']
})
export class IndexLayoutComponent implements OnInit {
    socket;
    BASE_URL = AppSetting.BASE_SERVER_URL;

    data = {
        name: '',
        userId: ''
    }
    public href = '';
    isLang = true; // true is vi
    private address;
    isAuthenicate = false;
    errorMessage: string = null;
    id = '1'
    user = '';
    message = '';
    searchHotel = new SearchHotel('', 1, 1, 1);
    lstHotel: any;
    myControl = new FormControl();
    options: string[] = ['Đà Nẵng', 'Hà Nội', 'Hồ Chí Minh'];
    filteredOptions: Observable<string[]>;

    constructor(
        private _loginService: LoginServiceService,
        public dialog: MatDialog,
        private chatService: ChatService,
        private _router: Router,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private router: ActivatedRoute,
        private translate: TranslateService,
        private cookie: CookieService,
        private eventEmitterService: EventEmitterService,
        private hotelService: HotelService
    ) {
        this.hotelService.getHotelSearch().subscribe(hotels => {
            if (hotels === undefined) {
                return;
            }
            this.lstHotel = hotels;
            for (const item of this.lstHotel) {
                if (item.address !== '') {
                    this.options.push(item.address)
                }
                    this.options.push(item.name)
            }
            console.log(this.options)
        });
    }

    ngOnInit() {
        if (this.eventEmitterService.subsVar === undefined) {
            this.eventEmitterService.subsVar = this.eventEmitterService.invokeFirstComponentFunction.subscribe((name: string) => {
                this.useChangeLanguage();
            });
        }
        this.translate.get('dialog.infoRoom').subscribe((data: any) => {
            this.searchHotel.total = data
        });

        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
    }

    useChangeLanguage() {
        this.isLang = !this.isLang
        if (this.isLang) {
            this.searchHotel.total = 'Thông tin phòng'
        } else {
            this.searchHotel.total = 'Information room'
        }
    }

    getEstablishmentAddress(place: object) {
        this.address = place['formatted_address'];
    }

    openDialogChooseHotelType(event) {
        if (this.isLang) {
            this.ShowDialogChooseHotelType(event).subscribe(data => {
                const checkSearch = data[0];
                console.log(checkSearch);
                if (checkSearch !== undefined) {
                    this.searchHotel.total = checkSearch['roomCount'] + ' phòng, ' + checkSearch['personCount'] + ' người lớn'
                    if (checkSearch['childrenCount'] !== undefined && checkSearch['childrenCount'] > 0) {
                        this.searchHotel.total = this.searchHotel.total + ', ' + checkSearch['childrenCount'] + ' trẻ em';
                    }
                }
            })
        } else {
            this.ShowDialogChooseHotelType(event).subscribe(data => {
                const checkSearch = data[0];
                console.log(checkSearch);
                if (checkSearch !== undefined) {
                    this.searchHotel.total = checkSearch['roomCount'] + ' room, ' + checkSearch['personCount'] + ' adult'
                    if (checkSearch['childrenCount'] !== undefined && checkSearch['childrenCount'] > 0) {
                        this.searchHotel.total = this.searchHotel.total + ', ' + checkSearch['childrenCount'] + ' children';
                    }
                }
            })
        }
    }

    ShowDialogChooseHotelType(event): Observable<any> {

        const dialogRef = this.dialog.open(ChooseRoomTypeDialogComponent, {
            width: '40vw',
            maxWidth: '40vw',
            height: 'auto',
            maxHeight: 'auto',
            position: {top: '360px'},
            data: {searchHotel: this.searchHotel},
        });
        return dialogRef.afterClosed();
    }

    searchHotelServer() {
        console.log(this.searchHotel);
        // @ts-ignore\\\\\\\\\\\\\\\\\
         this.cookie.set('searchText',  JSON.stringify(this.searchHotel));
         console.log(this.cookie.get('searchText'))
        this._router.navigateByUrl('/search-hotels')
        this.chatService.showNotification('success', 'Tìm kiếm thành công');
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

}

interface Object {
    [key: string]: any;
}
