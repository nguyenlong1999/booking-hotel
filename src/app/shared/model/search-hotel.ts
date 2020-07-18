export class SearchHotel {
    total: any;
    address: any;
    roomCount: any;
    childrenCount: any;
    personCount: any;

    constructor(address, roomCount, childrenCount, personCount) {
        this.address = address;
        this.roomCount = roomCount;
        this.childrenCount = childrenCount;
        this.personCount = personCount;
    }
}
