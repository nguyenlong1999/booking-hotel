export class SearchHotel {
    total:string;
    address: string;
    roomCount:number;
    childrenCount: number;
    personCount: number;
    constructor(address,roomCount, childrenCount,personCount) {
        this.address=address;
        this.roomCount=roomCount;
        this.childrenCount=childrenCount;
        this.personCount=personCount;
    }
}
