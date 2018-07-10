/**
 * Created by Mian on 2/23/2017.
 */
import {Component} from "@angular/core";
import 'style-loader!./notification.scss';

import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ReminderService} from "./reminder.service";
import {followUpList} from "./components/followUpList/followUpList.component";
import {FollowUpService} from "./followUp.service";

@Component({
  selector: "notification",
  templateUrl: "notification.html",
  styleUrls: ['./notification.scss'],
})
export class Notification {
  public switch:boolean=true;
  public binding :String;

  test = "abc";
  public user: any = {
    hours:'',
    days:'',
    texts:"",
  };
  public follow: any = {
    hour:'',

    text:"",
  };
  constructor(public _reminderService: ReminderService,public _followupService: FollowUpService ) {
  }



  public savedata(d)
  {
     console.log('modeal',d);
    console.log('product=',this.user);
    this._reminderService.setData(this.user);


  }
  public savedatafollowup()
  {

    console.log('product=',this.follow);
    this._followupService.setData(this.follow);


  }
  public login()
  {
    console.log('product=',this.user);
  }

  public alertMe(): void {
    this.switch=!this.switch
  }

}
