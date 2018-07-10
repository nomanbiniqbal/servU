/**
 * Created by Mian on 3/1/2017.
 */
import {Component, ViewChild} from "@angular/core";
import "style-loader!./branch.scss";
import {ModalDirective} from "ng2-bootstrap";
import {FormGroup} from "@angular/forms";


@Component({
  selector: "branch",
  templateUrl: "branch.html"
})
export class Branch {

  public list = [
    {
      type: 'text-message',
      hour:'8',
      days:'5',

      header: 'Posted new message',
      texts: 'Guys, check this out: \nA police officer found a perfect hiding place for watching for speeding motorists. One day, the officer was amazed when everyone was under the speed limit, so he investigated and found the problem. A 10 years old boy was standing on the side of the road with a huge hand painted sign which said "Radar Trap Ahead." A little more investigative work led the officer to the boy\'s accomplice: another boy about 100 yards beyond the radar trap with a sign reading "TIPS" and a bucket at his feet full of change.',
      time: 'Today 11:55 pm',
      ago: '25 minutes ago',
      expanded: false,
    }, {
      type: 'video-message',
      hour:'2',
      day:'5',
      author: 'Days',

      text: '"Vader and Me"',
      preview: 'app/feed/vader-and-me-preview.png',

      time: 'Today 9:30 pm',
      ago: '3 hrs ago',
      expanded: false,
    }
  ];

branch :any={
  name:'',
  address:'',
  street:'',
  Contact:'',
  TimeZone:'',
  Contry:'',
  PostCode:'',
  city:'',
  addressLine2:'',
  addressLine1:''
}
  @ViewChild('branchEditModel') editModel: ModalDirective;


  private onEdit() {
    this.editModel.show();
  }

  private save() {
    this.editModel.hide();
  }

  private delete() {
    this.editModel.hide();

  }
}
