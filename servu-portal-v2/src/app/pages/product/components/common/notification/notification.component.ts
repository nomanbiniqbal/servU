import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {FormControl} from "@angular/forms";
import * as _ from "lodash";
import {ModalDirective} from "ngx-bootstrap";
import {ProductService} from "../../../product.service";

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
    private types: any = [];
    public notifications: any = [];
    @ViewChild('nModal') m: ModalDirective;
    @ViewChild('f') f: FormControl;

    public tId: any;
    public pId: any;

    public header_name;
    public s: any = {};

    @Input() set product(p) {
        if (p.id) {
            this.pId = p.id;
            this.ps.getNotifications(p.id).subscribe(l => this.notifications = l);
        }
    }

    constructor(public ps: ProductService) {
        this.ps.getNotificationTypes().subscribe(r => this.types = r.data);
    }

    ngOnInit() {
    }

    addNew(id) {

        this.tId = id;
        console.log(this.tId);
        this.f.reset({
            product_id: this.pId,
            notification_type_id: this.tId
        });
      switch (id){
        case 1:
          this.header_name="Create FollowUp";
          break;

        case 2:
          this.header_name="Create Reminder";
          break;

      }
        this.m.show();
    }

    filterd(l, id) {
        if (l) {
            return _.filter(l, {notification_type_id: id});
        }
        return [];
    }

    edit(i) {

       i = Object.assign({
            product_id: this.pId,
            notification_type_id: this.tId,
            id: this.s.id
        }, i);
        this.f.reset(i);
      switch (this.tId){
        case 1:
          this.header_name="Update FollowUp";
          break;
        case 2:
          this.header_name="Update Reminder";
          break;

      }
        this.m.show();
    }

    submit(val) {
        if (val.id) {
            this.ps.updateNotifications(val).subscribe(r => {
                this.m.hide();
            });

        } else {
            this.ps.addNotifications(val).subscribe(r => {
                this.m.hide();
            });
        }
    }

    remove(i) {
        this.ps.removeNotification(i).subscribe(r => this.m.hide());
    }
}
