import {Component, EventEmitter, ViewChild} from "@angular/core";
import "style-loader!./provider.scss";
import {GoogleCalenderList} from "./components/googleCalenderList/googleCalenderList.component";

@Component({
  selector: "provider",
  templateUrl: "./provider.html"
})
export class Provider {
  @ViewChild(GoogleCalenderList) gcl:GoogleCalenderList;

  onSync() {
    this.gcl.sync();
  }
}

