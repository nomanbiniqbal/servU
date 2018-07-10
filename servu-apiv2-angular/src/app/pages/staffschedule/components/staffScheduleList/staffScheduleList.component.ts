import {Component} from "@angular/core";
import "style-loader!./staffScheduleList.scss";
import {ProviderService} from "../../provider.service";

@Component({
  selector: 'staffSchedule-list',
  templateUrl: './staffScheduleList.html'
})
export class StaffScheduleList {
  private list: (any)[];

  constructor(public _providersService: ProviderService) {
  }

  ngOnInit() {
    this.list = this._providersService.getData();
  }
}
