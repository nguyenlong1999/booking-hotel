import {Component, HostListener, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {AppSetting} from '../../../appsetting';
import {HotelService} from '../../../shared/service/hotel.service.';
import {Router} from '@angular/router';

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
    filterPrice = false
    priceFilterValue: number;
    searchText;
    ratingValue = 0;
    searchOption = {
        nameSpace: '',
        roomCount: '',
        childrenCount: '',
        personCount: ''
    }
    // minValue = 0;
    // maxValue = 10000;
    // options: Options = {
    //     floor: 0,
    //     ceil: 10000
    // };

    constructor(
        private cookie: CookieService,
        private hotelService: HotelService,
        private router: Router
    ) {
        $('.dropdown-toggle.btn-star').on('click', function (e) {
            $(this).next().toggle();
        });
        $('.dropdown-menu.keep-open').on('click', function (e) {
            e.stopPropagation();
        });
    }

    ngOnInit() {
        this.loadding = true;
        this.getHotels();
    }

    addStartFilter(event, star) {
        if (event.checked === true) {
            this.starFilterArray.push(star);
        } else {
            this.starFilterArray = this.starFilterArray.filter((value) => value !== star);
        }
        this.loadHotelFilter();
    }

    addFacilitiFilter(event, faciliti) {
        if (event.checked === true) {
            this.facilitiFilterArray.push(faciliti);
        } else {
            this.facilitiFilterArray = this.facilitiFilterArray.filter((value) => value !== faciliti);
        }
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

    addPriceFilter(value: number) {
        // value = 0 : giá thấp trước, value = 1: giá cao trước
        this.filterPrice = true;
        this.priceFilterValue = value;
        if (value === 0) {
            // console.log('gia cao trước')
            this.hotels.sort(function (a, b) {
                return a.roomDetail[0].price - b.roomDetail[0].price
            })
        } else if (value === 1) {
            // console.log('gia thap truoc')
            this.hotels.sort(function (a, b) {
                return b.roomDetail[0].price - a.roomDetail[0].price
            })
        }
        // this.loadHotelFilter()
    }

    loadHotelFilter() {
        let temp = [];
        this.hotels = [];
        for (const hotel of this.hotelFilter) {
            let starCheck = false;
            let ratingCheck = false;
            let falcilityCheck = false;
            let priceCheck = false;
            // check filter faciliti
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
            // check filter star
            if (this.starFilterArray !== undefined && this.starFilterArray.length > 0) {
                this.starFilterArray.forEach(star => {
                    if (hotel.hotel.starHotel === star) {
                        starCheck = true;
                    }
                })
            } else {
                starCheck = true;
            }
            // check filter rating
            if (this.ratingValue > 0) {
                // console.log(this.ratingValue, 'checking hotel rating')
                ratingCheck = true;
                // nếu điểm lớn hơn
            } else {
                ratingCheck = true;
            }
            // check filter price
            if (this.filterPrice === true) {
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
    }

    getHotels() {
        if (this.cookie.get('searchText')) {
            this.searchText = JSON.parse(this.cookie.get('searchText'));
        } else {
            this.searchText = {
                address: '',
                roomCount: 1,
                childrenCount: 1,
                personCount: 1
            }
        }
        console.log(this.searchText)
        this.searchOption.nameSpace = this.searchText.address;
        this.searchOption.roomCount = this.searchText.roomCount;
        this.searchOption.childrenCount = this.searchText.childrenCount;
        this.searchOption.personCount = this.searchText.personCount;
        this.hotelService.getHotelFind(this.searchOption).subscribe(hotels => {
            if (hotels['status'] !== 200) {
                this.router.navigate(['/']);
            }
            // console.log('tằng tằng tằng tằng find hotel is start =========>')
            if (hotels.body['hotels'].length > 0) {
                this.hotels = hotels.body['hotels'];
                // console.log('hotel search: ')
                // console.log(this.hotels)
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
                    const e = {name: 'common.hotel.freeCancle', icon: 'wifi_protected_setup'}
                    item.listPriceFacilities.push(e)
                    item.hotel.image = item.hotel.image.split(',');
                    const valueToRemove = '';
                    item.hotel.image = item.hotel.image.filter(item => item !== valueToRemove);
                    if (item.hotel.image.length === 0) {
                        item.hotel.image = this.imageDf;
                    }
                    // console.log(item.hotel.image.length);
                });
                if (this.hotels !== undefined) {
                    this.loadding = false;
                    this.hotelFilter = this.hotels;
                }
            } else {
                this.hotelService.getHotelFindAll().subscribe(hotelAll => {
                    this.hotels = hotelAll['hotels'];
                    // console.log('hotel find all ')
                    // console.log(this.hotels)
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
                            item.hotel.image = this.imageDf;
                        }
                        // console.log(item.hotel.image.length);
                    });
                    if (this.hotels !== undefined) {
                        this.loadding = false;
                        this.hotelFilter = this.hotels;
                    }
                })
            }
            // console.log(this.loadding);
        });
    }

    formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
