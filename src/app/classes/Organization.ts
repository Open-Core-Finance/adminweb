import { DayOfWeek } from "./DayOfWeek";
import { ListableItem } from "./ListableItem";

export class Organization implements ListableItem {
    id: string = "";
    name: string = "";
    _index: number = 0;
    streetAddressLine1: string = "";
    city: string = "";
    state: string = "";
    zipPostalCode: string = "";
    country: string = "";
    phoneNumber: string = "";
    email: string = "";
    currency: string = "";
    timezone: string = "";
    localDateFormat: string = "";
    localDateTimeFormat: string = "";
    decimalMark: string = "";
    logoUrl: string = "";
    iconUrl: string = "";

    nonWorkingDays: DayOfWeek[] = [];

    set index(index: number) {
        this._index = index;
    }

    get index() {
        return this._index;
    }
}