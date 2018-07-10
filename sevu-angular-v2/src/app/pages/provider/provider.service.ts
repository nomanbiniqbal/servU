import {Injectable} from "@angular/core";
import * as _ from "lodash";
import {Subject} from "rxjs";
import {ProviderRest} from "../../restServices/providerRest.service";

@Injectable()
export class ProviderService {

    public _data = [];

    public subject = new Subject<Object>();

    constructor(public _pr: ProviderRest) {

    }

    getList(branchId: string) {
        this._pr.getList(branchId).subscribe((result: any) => {
            this._data = result.data;
            this.subject.next(this._data);
        });
        return this.subject.asObservable();
    }

    getSchdule(userId: string) {
        return this._pr.getSchdule(userId);
    }

    getBasicSchedule(userId: any) {
        return this._pr.getBasicSchedule(userId);
    }

    updateBasicSchedule(val: any) {
        return this._pr.updateBasicSchedule(val);
    }


    addNew(val: any) {
        return this._pr.create(val).do((res: any) => {
            this._data.push(res.data);
            this.subject.next(this._data);
        });
    }

    update(val: any) {
        // val.city_code = "12";
        return this._pr.update(val).do((res: any) => {
            //TODO: need to remove this currently its not valid
            this._data.push(res.data.description);
            this.subject.next(this._data);
        });
    }

    get(id) {
        return this._pr.detail(id).map((result: any) => {
            var data = result.data;
            let found = _.find(data.user_contact, {is_primary: 1});
            if (found) {
                data.telephone = found['phone_number'];
            }
            found = _.find(data.user_address, {is_primary: 1});
            if (found) {
                data.address = found['address'];
            }
            return data;
        });
    }

    public _adSchedule = [];
    public _adSubject = new Subject<Object>();

    getAdvanceSchedule(userId) {
        this._pr.getAdvanceSchedule(userId).subscribe((r: any) => {
            this._adSchedule = r.data;
            this._adSubject.next(this._adSchedule);
        });
        return this._adSubject.asObservable();

    }

    addAdvanceSchedule(val) {
        return this._pr.postAdvanceSchedule(val).do(r => {
            this._adSchedule.push(r.data);
            this._adSubject.next(this._adSchedule);
        });
    }

    editAdvanceSchedule(val: any) {
        return this._pr.putAdvanceSchedule(val).do(r => {
            var number = _.findIndex(this._adSchedule, {"id": r.data.id});
            this._adSchedule[number] = r.data;
            this._adSubject.next(this._adSchedule);
        });
    }

    deleteAdvanceSchedule(id: any) {
        return this._pr.removeAdvanceSchedule(id).do(r => {
            var number = _.findIndex(this._adSchedule, {"id": id});
            this._adSchedule.splice(number, 1);
            this._adSubject.next(this._adSchedule);
        });
    }

    public _adrSchedule :any = [];
    public _adrSubject = new Subject<Object>();


    getAddress(userId: string) {
        this._pr.getAddress(userId).subscribe((r: any) => {
            this._adrSchedule = r.data;
            this._adrSubject.next(this._adrSchedule);
        });
        return this._adrSubject.asObservable();

    }

    addAddress(val: any) {
        return this._pr.postAddress(val).do(r => {
            this._adrSchedule = r.data;
            this._adrSubject.next(this._adrSchedule);
        });
    }

    editAddress(val: any) {
        return this._pr.putAddress(val).do(r => {
            var number = _.findIndex(this._adrSchedule, {"id": r.data.id});
            this._adrSchedule[number] = r.data;
            this._adrSubject.next(this._adrSchedule);
        });
    }

    deletAddress(id: any) {
        return this._pr.deleteAddress(id).do(r => {
            var number = _.findIndex(this._adrSchedule, {"id": id});
            this._adrSchedule.splice(number, 1);
            this._adrSubject.next(this._adrSchedule);
        });
    }

    public _cnSchedule :any = [];
    public _cnSubject = new Subject<Object>();


    getContact(userId: string) {
        this._pr.getContact(userId).subscribe((r: any) => {
            this._cnSchedule = r.data;
            this._cnSubject.next(this._cnSchedule);
        });
        return this._cnSubject.asObservable();

    }

    addContact(val: any) {
        return this._pr.postContact(val).do(r => {
            this._cnSchedule = r.data;
            this._cnSubject.next(this._cnSchedule);
        });
    }

    editContact(val: any) {
        return this._pr.putContact(val).do(r => {
            var number = _.findIndex(this._cnSchedule, {"id": r.data.id});
            this._cnSchedule[number] = r.data;
            this._cnSubject.next(this._cnSchedule);
        });
    }

    deletContact(id: any, userId: any) {
        return this._pr.deleteContact(id, userId).do(r => {
            var number = _.findIndex(this._cnSchedule, {"id": id});
            this._cnSchedule.splice(number, 1);
            this._cnSubject.next(this._cnSchedule);
        });
    }

    public _sessions = [];
    public _sessionsSubject = new Subject<Object>();

    getSessions(id: any) {
        this._pr.getSessions(id).subscribe((result: any) => {
            this._sessions = result.data;
            this._sessionsSubject.next(this._sessions);
        });

        return this._sessionsSubject.asObservable();
    }
}
