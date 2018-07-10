import {Injectable} from "@angular/core";
import * as _ from "lodash";
import {Subject} from "rxjs";
import {CustomerRest} from "../../restServices/customerRest.service";
import {ProviderRest} from "../../restServices/providerRest.service";

@Injectable()
export class CustomerService {
    public _data = [];

    public subject = new Subject<Object>();

    constructor(public _cr: CustomerRest, public _pr: ProviderRest) {

    }

    getList() {
        this._cr.getList().subscribe((result: any) => {
            this._data = result.data;
            this.subject.next(this._data);
        });

        return this.subject.asObservable();

    }

    addNew(val: any) {
        //TODO: need to remove this currently its not valid
        val.city_code = "12";
        return this._cr.create(val).do((res: any) => {
            //TODO: need to remove this currently its not valid
            this._data.push(res.data);
            this.subject.next(this._data);
        });
    }

    update(val: any) {
        //TODO: need to remove this currently its not valid
        val.city_code = "12";
        return this._cr.update(val).do((res: any) => {
            //TODO: need to remove this currently its not valid
            this.subject.next(this._data);
            return this.subject.asObservable();
        });
    }

    delete(val: any) {
        return this._cr.delete(this.getCustomerById(val)).do((res: any) => {
            var x = _.findIndex(this._data, {'id': val});
            this._data.splice(x);
            this.subject.next(this._data);


        });
    }

    getCustomerById(id) {
        return this._cr.detail(id).map((result: any) => {
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

    public _adrCustomer = [];
    public _adrSubject = new Subject<Object>();


    getAddress(userId: string) {
        this._cr.getAddress(userId).subscribe((r: any) => {
            this._adrCustomer = r.data;
            this._adrSubject.next(this._adrCustomer);
        });
        return this._adrSubject.asObservable();

    }

    addAddress(val: any) {
        return this._cr.postAddress(val).do(r => {
            this._adrCustomer.push(r.data);
            this._adrSubject.next(this._adrCustomer);
        });
    }

    editAddress(val: any) {
        return this._cr.putAddress(val).do(r => {
            var number = _.findIndex(this._adrCustomer, {"id": r.data.id});
            this._adrCustomer[number] = r.data;
            this._adrSubject.next(this._adrCustomer);
        });
    }

    deletAddress(id: any) {
        return this._cr.deleteAddress(id).do(r => {
            var number = _.findIndex(this._adrCustomer, {"id": id});
            this._adrCustomer.splice(number, 1);
            this._adrSubject.next(this._adrCustomer);
        });
    }

    public _cnCustomer = [];
    public _cnSubject = new Subject<Object>();


    getContact(userId: string) {
        this._cr.getContact(userId).subscribe((r: any) => {
            this._cnCustomer = r.data;
            this._cnSubject.next(this._cnCustomer);
        });
        return this._cnSubject.asObservable();

    }

    addContact(val: any) {
        return this._cr.postContact(val).do(r => {
            this._cnCustomer.push(r.data);
            this._cnSubject.next(this._cnCustomer);
        });
    }

    editContact(val: any) {
        return this._cr.putContact(val).do(r => {
            var number = _.findIndex(this._cnCustomer, {"id": r.data.id});
            this._cnCustomer[number] = r.data;
            this._cnSubject.next(this._cnCustomer);
        });
    }

    deletContact(id: any, userId: any) {
        return this._cr.deleteContact(id, userId).do(r => {
            var number = _.findIndex(this._cnCustomer, {"id": id});
            this._cnCustomer.splice(number, 1);
            this._cnSubject.next(this._cnCustomer);
        });
    }


    public _cusNotes = [];
    public _cusNotesAlign = [];
    public _cusNotesSubject = new Subject<Object>();

    getNotesbyId(val: any) {
        this._cr.getNotes(val).subscribe((r: any) => {
            this._cusNotes = r.data;
            this._cusNotesSubject.next(this._cusNotes);
        });
        return this._cusNotesSubject.asObservable();

    }

  createNotes(val:any) {
      return this._cr.createNotes(val).do(r => {
        this._cusNotesAlign = this._cusNotes;
        this._cusNotes.push(r.data);
        this._cusNotesSubject.next(this._cusNotes);
      });
  }

    updateNotes(val: any) {
        return this._cr.updateNotes(val).do(r => {
            var number = _.findIndex(this._cusNotes, {"id": r.data.id});
            this._cusNotes[number] = r.data;
            this._cusNotesSubject.next(this._cusNotes);
        });
    }

    deletenote(id: any) {
        return this._cr.deleteNotes(id).do(r => {
            var number = _.findIndex(this._cusNotes, {"id": id});
            this._cusNotes.splice(number, 1);
            this._cusNotesSubject.next(this._cusNotes);
        });
    }

    public _provider_data = [];
    public _subjectProvider = new Subject<Object>();

    getListProvider(branchId: string) {
        this._pr.getList(branchId).subscribe((result: any) => {
            this._provider_data = result.data;
            this._subjectProvider.next(this._provider_data);
        });
        return this._subjectProvider.asObservable();
    }

    private _membership_data = [];
    private _subjectMembership = new Subject<Object>();

    getMemberships(userId: string) {
        this._cr.getMemberships(userId).subscribe((result: any) => {
            this._membership_data = result.data;
            this._subjectMembership.next(this._membership_data);
        });
        return this._subjectMembership.asObservable();
    }


    addMembership(val) {
        return this._cr.postMemberships(val).do(r => {
            this._membership_data.push(r.data);
            this._subjectMembership.next(this._membership_data);
        });
    }

    updateMembership(val) {
        return this._cr.putMemberships(val).do(r => {
            var number = _.findIndex(this._membership_data, {"id": r.data.id});
            this._membership_data[number] = r.data;
            this._subjectMembership.next(this._membership_data);
        });
    }

    deleteMembership(id) {
        return this._cr.deleteMemberships(id).do(r => {
            var number = _.findIndex(this._membership_data, {"id": id});
            this._membership_data.splice(number, 1);
            this._subjectMembership.next(this._membership_data);
        });
    }


}
