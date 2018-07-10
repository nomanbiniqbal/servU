/**
 * Created by Mian on 3/8/2017.
 */
import {Component} from "@angular/core";
import "style-loader!./reminderList.scss";
import {ReminderService} from "../../reminder.service";


@Component({
    selector: 'reminder-list',
    templateUrl: './reminderList.html'
})
export class ReminderList {
    public list: (any)[];

    constructor(public _reminderService: ReminderService) {
    }

    ngOnInit() {
        this.list = this._reminderService.getData();
    }
}
