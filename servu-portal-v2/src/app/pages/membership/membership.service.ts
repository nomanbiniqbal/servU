import {Injectable} from "@angular/core";
import * as _ from "lodash";
import * as moment from "moment";
import {Subject} from "rxjs";
import {MembershipRest} from "../../restServices/membership-rest.service";

@Injectable()
export class MembershipService {

    constructor(public rest: MembershipRest) {
    }

    private _data = [];
    private subject = new Subject<Object>();


    getMembershipList() {
        this.rest.getMembershipList().subscribe(l => {
            this._data = l.data;
            this.subject.next(this._data);
        });
        return this.subject.asObservable();
    }

    createMembership(val) {
        val = Object.assign({}, val);
        val.branch_ids = _.map(_.filter(val.branch, (r: any) => {
            return r.checked
        }), (r: any) => {
            return r.id;
        }).join(",");
        val.pricing = [];
        if (val.price_week) {
            val.pricing.push({
                membership_fee: val.price_week_val,
                price_type: 1
            })
        }
        if (val.price_month) {
            val.pricing.push({
                membership_fee: val.price_month_val,
                price_type: 2
            })

        }
        if (val.price_year) {
            val.pricing.push({
                membership_fee: val.price_year_val,
                price_type: 3
            })

        }
        val.affected_to = moment(val.affected_to.jsdate).format("YYYY-MM-DD HH:mm:SS");
        val.affected_from = moment(val.affected_from.jsdate).format("YYYY-MM-DD HH:mm:SS");
        return this.rest.createMebership(val).do((r: any) => {
            this._data.push(r.data);
            this.subject.next(this._data);
        });
    }

    editMembership(val) {
        val = Object.assign({}, val);
        if (_.isObject(val.affected_to)) {
            val.affected_to = moment(val.affected_to.jsdate).format("YYYY-MM-DD HH:mm:SS");
        }
        if (_.isObject(val.affected_from)) {
            val.affected_from = moment(val.affected_from.jsdate).format("YYYY-MM-DD HH:mm:SS");
        }
        return this.rest.putMembership(val).do((r: any) => {
            var n = _.findIndex(this._data, {id: r.data.id});
            this._data[n] = r.data;
            this.subject.next(this._data);
        });
    }

    removeMembership(id: any) {
        return this.rest.deleteMembership(id).do((r: any) => {
            var n = _.findIndex(this._data, {id: id});
            this._data.splice(n, 1);
            this.subject.next(this._data);
        });
    }

    private _membershipProductData = [];
    private _membershipProductSubject = new Subject<Object>();

    getMembershipProduct(id) {
        this.rest.getMembershipProduct(id).subscribe(r => {
            this._membershipProductData = r.data;
            this._membershipProductSubject.next(this._membershipProductData)
        });
        return this._membershipProductSubject.asObservable();
    }

    addMembershipProduct(val) {
        return this.rest.postMembershipProduct(val).do(r => {
            this._membershipProductData.push(r.data);
            this._membershipProductSubject.next(this._membershipProductData)
        });
    }

    updateMembershipProduct(val) {
        return this.rest.putMembershipProduct(val).do(r => {
            var n = _.findIndex(this._membershipProductData, {id: r.data.id});
            this._membershipProductData[n] = r.data;
            this._membershipProductSubject.next(this._membershipProductData)
        });
    }

    deletMembershipProduct(id) {
        return this.rest.deleteMembershipProduct(id).do(r => {
            var n = _.findIndex(this._membershipProductData, {id: id});
            this._membershipProductData.splice(n, 1);
            this._membershipProductSubject.next(this._membershipProductData)

        });
    }

    private _membershipBranchData = [];
    private _membershipBranchSubject = new Subject<Object>();

    getMembershipBranch(id) {
        this.rest.getMembershipBranch(id).subscribe(r => {
            this._membershipBranchData = r.data;
            this._membershipBranchSubject.next(this._membershipBranchData)
        });
        return this._membershipBranchSubject.asObservable();
    }

    addMembershipBranch(val) {
        return this.rest.postMembershipBranch(val).do(r => {
            this._membershipBranchData.push(r.data);
            this._membershipBranchSubject.next(this._membershipBranchData)
        });
    }

    updateMembershipBranch(val) {
        return this.rest.putMembershipBranch(val).do(r => {
            var n = _.findIndex(this._membershipBranchData, {id: r.data.id});
            this._membershipBranchData[n] = r.data;
            this._membershipBranchSubject.next(this._membershipBranchData)
        });
    }

    deletMembershipBranch(id) {
        return this.rest.deleteMembershipBranch(id).do(r => {
            var n = _.findIndex(this._membershipBranchData, {id: id});
            this._membershipBranchData.splice(n, 1);
            this._membershipBranchSubject.next(this._membershipBranchData)

        });
    }

    private _membershipPriceData = [];
    private _membershipPriceSubject = new Subject<Object>();


    getMembershipPrice(id) {
        this.rest.getMembershipPrice(id).subscribe(r => {
            this._membershipPriceData = r.data;
            this._membershipPriceSubject.next(this._membershipPriceData)
        });
        return this._membershipPriceSubject.asObservable();
    }

    addMembershipPrice(val) {
        return this.rest.postMembershipPrice(val).do(r => {
            this._membershipPriceData.push(r.data);
            this._membershipPriceSubject.next(this._membershipPriceData)
        });
    }

    updateMembershipPrice(val) {
        return this.rest.putMembershipPrice(val).do(r => {
            var n = _.findIndex(this._membershipPriceData, {id: r.data.id});
            this._membershipPriceData[n] = r.data;
            this._membershipPriceSubject.next(this._membershipPriceData)
        });
    }

    deletMembershipPrice(id) {
        return this.rest.deleteMembershipPrice(id).do(r => {
            var n = _.findIndex(this._membershipPriceData, {id: id});
            this._membershipPriceData.splice(n, 1);
            this._membershipPriceSubject.next(this._membershipPriceData)

        });
    }


}
