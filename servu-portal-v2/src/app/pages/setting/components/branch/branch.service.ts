import {Injectable} from "@angular/core";
import * as _ from "lodash";
import {Subject} from "rxjs";
import {BusinessRest} from "../../../../restServices/businessRest.service";
@Injectable()
export class BranchService {

    public _data = [];

    public subject = new Subject<Object>();

    constructor(public _br: BusinessRest) {

    }

    getList() {
        this._br.getBranchesList().subscribe((result: any) => {
            this._data = result.data;
            this.subject.next(this._data);
        });
        return this.subject.asObservable();

    }

    getShortNameWeek(weekId) {
        switch (weekId) {
            case 1:
                return "Mon";
            case 2:
                return "Tue";
            case 3:
                return "Wed";
            case 4:
                return "Thu";
            case 5:
                return "Fri";
            case 6:
                return "Sat";
            case 7:
                return "Sun";
        }
    }

    getDetail(id: any) {
        return this._br.getBranchDetail(id);
    }

    createNew(val: any) {
        val.open_at = "00:00:00";
        val.close_at = "22:00:00";
        return this._br.createBranch(val).do((r: any) => {
            this._data.push(r.data);
            this.subject.next(this._data);
        });
    }

    edit(val: any) {
        return this._br.editBranch(val).do((r: any) => {

            var number = _.findIndex(this._data, {"id": r.data.id});
            this._data[number] = r.data;
            this.subject.next(this._data);
        });
    }
}
