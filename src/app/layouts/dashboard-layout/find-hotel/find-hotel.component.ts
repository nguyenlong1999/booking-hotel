import {Component, HostListener, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {AppSetting} from '../../../appsetting';
import {HotelService} from '../../../shared/service/hotel.service.';

@Component({
    selector: 'app-find-hotel',
    templateUrl: './find-hotel.component.html',
    styleUrls: ['./find-hotel.component.css']
})
export class FindHotelComponent implements OnInit {
    hotels: any;
    hotelFilter: any;
    BASE_URL = AppSetting.BASE_SERVER_URL + '/api/images/';
    loadding = false;
    imageDf = ['image-1593099960393.png', 'image-1593099960393.png'];
    facilitiFilterArray = []
    starFilterArray = []
    searchText;
    ratingValue = 0;
    minPrice = 0;
    maxPrice = 0;
    priceCheckAll = false;

    // falcilityCheckAll = [];

    constructor(
        private cookie: CookieService,
        private hotelService: HotelService
    ) {
        $('.btn-star').on('click', function (e) {
            $(this).next().toggle();
        });
        $('.dropdown-menu.keep-open').on('click', function (e) {
            e.stopPropagation();
        });
    }

    ngOnInit() {
        this.loadding = true;
        this.getHotels();
        setTimeout(() => {

        }, 2000);
        this.searchText = JSON.parse(this.cookie.get('searchText'));
        console.log(this.searchText)
    }

    addStartFilter(event, star) {
        if (event.checked === true) {
            this.starFilterArray.push(star);
        } else {
            this.starFilterArray = this.starFilterArray.filter((value) => value !== star);
        }
        console.log('star filter array : ')
        console.log(this.starFilterArray)
        this.loadHotelFilter();
    }

    addFacilitiFilter(event, faciliti) {
        if (event.checked === true) {
            this.facilitiFilterArray.push(faciliti);
        } else {
            this.facilitiFilterArray = this.facilitiFilterArray.filter((value) => value !== faciliti);
        }
        console.log('faciliti filter array : ')
        console.log(this.facilitiFilterArray)
        this.loadHotelFilter();
    }

    formatLabel(value: number) {
        if (value >= 1) {
            this.ratingValue = value;
            return Math.round(value) + '*';
        } else {
            this.ratingValue = 0
        }
        return value;
    }

    changePriceFiler(event) {
        this.loadHotelFilter()
    }

    loadHotelFilter() {
        let temp = [];
        this.hotels = [];
        let a = 'freeWifi'
        for (const hotel of this.hotelFilter) {
            let starCheck = false;
            let ratingCheck = false;
            let falcilityCheck = false;
            let priceCheck = false;
            if (this.facilitiFilterArray !== undefined && this.facilitiFilterArray.length > 0) {
                this.facilitiFilterArray.forEach(faciliti => {
                    for (const value of Object.entries(hotel.faciliti)) {
                        if (faciliti === value[0] && value[1] === true) {
                            falcilityCheck = true;
                        }
                    }
                })
            } else {
                falcilityCheck = true;
            }
            if (this.starFilterArray !== undefined && this.starFilterArray.length > 0) {
                this.starFilterArray.forEach(star => {
                    if (hotel.hotel.starHotel === star) {
                        console.log('ok check')
                        starCheck = true;
                    }
                })
            } else {
                starCheck = true;
            }
            if (this.ratingValue > 0) {
                console.log(this.ratingValue, 'checking hotel rating')
                ratingCheck = true;
                // nếu điểm lớn hơn
            } else {
                ratingCheck = true;
            }
            if (this.priceCheckAll === true && this.maxPrice > 0) {
                // filter theo giá
                priceCheck = true;
            } else {
                priceCheck = true;
            }
            if (falcilityCheck === true && starCheck === true && ratingCheck === true && priceCheck === true) {
                temp.push(hotel)
            }
        }
        this.hotels = temp;
        console.log(this.hotels);
    }

    getHotels() {
        this.hotelService.getHotelFind().subscribe(hotels => {
            if (hotels === undefined) {
                return;
            }
            this.hotels = hotels['hotels'];
            console.log(this.hotels);
            this.hotels.forEach(item => {
                item.listPriceFacilities = [];
                if (item.faciliti.freeWifi === true) {
                    const a = {name: 'facilities.freeWifi', icon: 'wifi'}
                    item.listPriceFacilities.push(a)
                }
                if (item.faciliti.freeInternet === true) {
                    const b = {name: 'facilities.freeInternet', icon: 'network_check'}
                    item.listPriceFacilities.push(b)
                }
                if (item.faciliti.freeBreakfast === true) {
                    const c = {name: 'facilities.freeBreakfast', icon: 'free_breakfast'}
                    item.listPriceFacilities.push(c)
                }
                if (item.faciliti.freeParking === true) {
                    const d = {name: 'facilities.freeParking', icon: 'wifi_protected_setup'}
                    item.listPriceFacilities.push(d)
                }
                const e = {name: 'Hủy miễn phí', icon: 'wifi_protected_setup'}
                item.listPriceFacilities.push(e)
                item.hotel.image = item.hotel.image.split(',');
                const valueToRemove = '';
                item.hotel.image = item.hotel.image.filter(item => item !== valueToRemove);
                if (item.hotel.image.length === 0) {
                    console.log('hehe')
                    item.hotel.image = this.imageDf;
                }
                console.log(item.hotel.image.length);
                this.hotelFilter = this.hotels;
                this.loadding = false;
                // console.log(item.listPriceFacilities);
            });
        });
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        // console.log(window.scrollY);
        const pos = document.documentElement.scrollTop || document.body.scrollTop;
        const max = document.documentElement.scrollHeight;
        // console.log('pos:' + pos)
        // console.log('max:' + max)
        // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
        if (!this.loadding) {
            if (pos < 600) {
                // console.log('scrolling up');
                const element = document.getElementById('left-offer');
                element.setAttribute('class', 'col-lg-3');

                // const element2 = document.getElementById('space');
                // element2.setAttribute('style', 'display:none;');
                // element2.removeAttribute('class');

                const hotelItem = document.getElementById('hotel-item');
                hotelItem.style.marginLeft = '0';
            } else if (pos > 600 && pos < (max - 900)) {
                // console.log('scrolling down');
                // tslint:disable-next-line:no-duplicate-variable
                const element = document.getElementById('left-offer');
                element.setAttribute('class', 'fixed-left');

                // const element2 = document.getElementById('space');
                // element2.setAttribute('style', 'display:inline-block; padding: 0 1%');
                // element2.setAttribute('class', 'col-lg-3');

                const hotelItem = document.getElementById('hotel-item');
                hotelItem.style.marginLeft = '25%';
            } else if (pos >= (max - 900)) {
                // console.log('scrolling down 1');
                const element = document.getElementById('left-offer');
                element.setAttribute('class', 'col-lg-3');

                // const element2 = document.getElementById('space');
                // element2.setAttribute('style', 'display:none;');
                // element2.removeAttribute('class');

                const hotelItem = document.getElementById('hotel-item');
                hotelItem.style.marginLeft = '0';
            }
        }
    }
}
