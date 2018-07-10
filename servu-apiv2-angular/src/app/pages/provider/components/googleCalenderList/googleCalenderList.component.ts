/**
 * Created by Mian on 2/28/2017.
 */
import {Component} from "@angular/core";
import {GapiService} from "./gapi.service";


declare const gapi: any;


@Component({
  selector: 'google-calender-list',
  templateUrl: './googleCalenderList.html',
})
export class GoogleCalenderList {

  private list;

  constructor(private _gpi: GapiService) {
  }

  public sync() {
    this._gpi.getList().subscribe((result:any)=>{
      this.list=result;
    });
  }

}
