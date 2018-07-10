/**
 * Created by Mian on 2/23/2017.
 */
import {Component} from "@angular/core";
import "style-loader!./notification.scss";
import {FollowUpService} from "./followUp.service";
import {ReminderService} from "./reminder.service";

@Component({
    selector: "notification",
    templateUrl: "notification.html",
    styleUrls: ['./notification.scss'],
})
export class Notification {
    public switch: boolean = true;
    public binding: String;

    test = "abc";
    public user: any = {
        hours: '',
        days: '',
        texts: "",
    };
    public follow: any = {
        hour: '',

        text: "",
    };

    constructor(public _reminderService: ReminderService, public _followupService: FollowUpService) {
    }


    public savedata(d) {
        this._reminderService.setData(this.user);


    }

    public savedatafollowup() {

        this._followupService.setData(this.follow);


    }

    public login() {
    }

    public alertMe(): void {
        this.switch = !this.switch
    }

}
