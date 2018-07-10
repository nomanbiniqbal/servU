import {Injectable} from "@angular/core";

import * as _ from "lodash";
import {Subject} from "rxjs";
import {GlobalState} from "../../global.state";
import {AuthRest} from "../../restServices/authRest.service";
import {ProductRest} from "../../restServices/productRest.service";
@Injectable()
export class ProductService {


    constructor(private _pr: ProductRest, private _ar: AuthRest, private g: GlobalState) {

    }


    public _categories: any = [];
    public _cSubject = new Subject<Object>();

    getCategories() {
        this._pr.getCategories().subscribe((r: any) => {
            this._categories = r.data;
            this._cSubject.next(this._categories);
        });
        return this._cSubject.asObservable();

    }


    addCategory(name: string) {
        return this._pr.postCategory({name: name}).do(r => {
            this._categories.push(r.data);
            this._cSubject.next(this._categories);
        });
    }

    editCategory(val: any) {
        return this._pr.putCategory(val).do(r => {
            var number = _.findIndex(this._categories, {"id": r.data.id});
            this._categories[number] = r.data;
            this._cSubject.next(this._categories);
        });
    }

    deleteCategory(id: any) {
        return this._pr.deleteCategory(id).do(r => {
            var number = _.findIndex(this._categories, {"id": id});
            this._categories.splice(number, 1);
            this._cSubject.next(this._categories);
        });
    }


    public _productData: any = [];
    public _pSubject = new Subject<Object>();

    getProduct(type) {
        this._pr.getProduct(type).subscribe((r: any) => {
            this._productData = r.data;
            this._pSubject.next(this._productData);
        });
        return this._pSubject.asObservable();
    }

    addProduct(val: any) {
        return this._pr.postProduct(val).do(r => {
            if (this._ar.isStartUp) {
                this.g.notifyDataChanged("popover.hide", 2);
                this.g.notifyDataChanged("popover.show", 3);
            }
            this._addProductToList(r.data);
            this._pSubject.next(this._productData);
        });
    }

    editProduct(val: any) {
        return this._pr.putProduct(val).do((r: any) => {
                var p = r.data;
                var find: any = _.find(this._productData, {id: p.product_category_id});
                if (find) {
                    var number = _.findIndex(find.business_product, {"id": p.id});
                    find.business_product[number] = r.data;
                }
                this._pSubject.next(this._productData);
            }
        );
    }

    deleteProduct(product: any) {

        return this._pr.deleteProduct(product.id).do(r => {
            this._deleteProductToList(product);
            this._pSubject.next(this._productData);
        });
    }

    private _addProductToList(p: any) {
        var find: any = _.find(this._productData, {id: p.product_category_id});
        if (find) {
            find.business_product.push(p);
        } else {
            var find2: any = _.find(this._categories, {id: p.product_category_id});
            if (find2) {
                find2.business_product = [p];
                this._productData.push(find2);
            }
        }
    }

    private _deleteProductToList(p: any) {
        var find: any = _.find(this._productData, {id: p.product_category_id});
        if (find) {
            var number = _.findIndex(find.business_product, {id: p.id});
            find.business_product.splice(number, 1);
        }
    }


    getProductCommonStaff(ids: any) {
        return this._pr.getProductCommonStaff(ids);
    }


    public _productStaffData: any = [];
    public _pStaffSubject = new Subject<Object>();

    getProductStaff(id: any) {
        this._pr.getProductStaff(id).subscribe((r: any) => {
            this._productStaffData = r.data;
            this._pStaffSubject.next(this._productStaffData);
        });
        return this._pStaffSubject.asObservable();
    }

    addProductStaff(val: any) {
        return this._pr.postProductStaff(val).do(r => {
            this._productStaffData.push(r.data);
            this._pStaffSubject.next(this._productStaffData);
        });
    }

    editProductStaff(val: any) {
        return this._pr.putProductStaff(val).do(r => {
            var number = _.findIndex(this._productStaffData, {"id": r.data.id});
            this._productStaffData[number] = r.data;
            this._pStaffSubject.next(this._productStaffData);
        });
    }
    deleteProductStaff(product: any) {
        return this._pr.deleteProductStaff(product.business_user_id).do(r => {
          var number = _.findIndex(this._productStaffData, {"id": r.data.id});
          this._productStaffData[number] = r.data;
          this._pStaffSubject.next(this._productStaffData);
        });
    }

    public _classSchedule: any = [];
    public _classScheduleSubject = new Subject<Object>();

    getClassSchedule(id: any) {
        this._pr.getClassSchedule(id).subscribe((r: any) => {
            this._classSchedule = r.data;
            this._classScheduleSubject.next(this._classSchedule);
        });
        return this._classScheduleSubject.asObservable();
    }

    addClassSchedule(val: any) {
        return this._pr.postClassSchedule(val).do((r: any) => {
            this._classSchedule.push(r.data);
            this._classScheduleSubject.next(this._classSchedule);
        });
    }

    editClassSchedule(val: any) {
        return this._pr.putClassSchedule(val).do((r: any) => {
            var number = _.findIndex(this._classSchedule, {"id": r.data.id});
            this._classSchedule[number] = r.data;
            this._classScheduleSubject.next(this._classSchedule);
        });
    }

    deleteClassSchedule(id) {
        return this._pr.deleteClassSchedule(id).do(r => {
            var number = _.findIndex(this._classSchedule, {"id": id});
            this._classSchedule.splice(number, 1);
            this._classScheduleSubject.next(this._classSchedule);
        });
    }

    public _participant: any = [];
    public _participantSubject = new Subject<Object>();

    getParticipants(id: any) {
        this._pr.getParticipants(id).subscribe((r: any) => {
            this._participant = r.data;
            this._participantSubject.next(this._participant);
        });
        return this._participantSubject.asObservable();
    }

    addParticipant(id: any, sessionId) {
        return this._pr.postParticipants({id: sessionId, user_id: id}).do((r: any) => {
            this._participant.push(r.data);
            this._participantSubject.next(this._participant);
        });
    }

    removeParticipants(val: any) {
        return this._pr.deleteParticipants(val).do((r: any) => {
            var number = _.findIndex(this._participant, {"id": val});
            this._participant.splice(number, 1);
            this._participantSubject.next(this._participant);
        });
    }

    getNotificationTypes() {
        return this._pr.getNotificationTypes();
    }

    public _notification: any = {};
    public _notificationSubject = new Subject<Object>();

    getNotifications(id) {
        this._pr.getNotifications(id).subscribe((r: any) => {
            this._notification = r.data;
            this._notificationSubject.next(this._notification);
        });
        return this._notificationSubject.asObservable();
    }

    addNotifications(val) {
        return this._pr.postNotification(val).do((r: any) => {
            this._notification.push(r.data);
            this._notificationSubject.next(this._notification);
        });
    }

    removeNotification(val: any) {
        return this._pr.deleteNotification(val).do((r: any) => {
            var number = _.findIndex(this._notification, {"id": val});
            this._notification.splice(number, 1);
            this._notificationSubject.next(this._notification);
        });
    }

    updateNotifications(val: any) {
        return this._pr.putNotification(val).do((r: any) => {
            var number = _.findIndex(this._notification, {"id": r.data.id});
            this._notification[number] = r.data;
            this._notificationSubject.next(this._notification);
        });

    }
}
