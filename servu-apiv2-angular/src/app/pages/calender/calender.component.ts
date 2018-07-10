/**
 * Created by Mian on 2/23/2017.
 */
import {Component} from "@angular/core";
import 'style-loader!./calender.scss';
import {CalendarService} from "./calendar.service";

@Component({
  selector: "calender",
  templateUrl: "./calender.html"
})
export class Calender {
  public calendarConfiguration:any;
  private _calendar:Object;

  constructor(private _calendarService:CalendarService) {
    this.calendarConfiguration = this._calendarService.getData();
    this.calendarConfiguration.select = (start, end) => this._onSelect(start, end);
  }

  public onCalendarReady(calendar):void {
    this._calendar = calendar;
  }

  private _onSelect(start, end):void {

    if (this._calendar != null) {
      let title = prompt('Event Title:');
      let eventData;
      if (title) {
        eventData = {
          title: title,
          start: start,
          end: end
        };
        jQuery(this._calendar).fullCalendar('renderEvent', eventData, true);
      }
      jQuery(this._calendar).fullCalendar('unselect');
    }
  }
}
