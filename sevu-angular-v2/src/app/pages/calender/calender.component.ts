import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {NgModel} from "@angular/forms";
import "style-loader!./calender.scss";
import {AuthRest} from "../../restServices/authRest.service";
import {ProviderService} from "../provider/provider.service";
import {EventService} from "../today/event.service";
import {CalendarService} from "./calendar.service";
import {EventCreatePopupComponent} from "app/pages/calender/component/event-create-popup/event-create-popup.component";

@Component({
    selector: "calender",
    templateUrl: "./calender.html"
})
export class Calender implements AfterViewInit {
    providers: any = [];
    public calendarConfiguration: any;
    public _calendar: Object;
    @ViewChild('provider') provider: NgModel;
    @ViewChild('event') eventCreate: EventCreatePopupComponent;

    constructor(public _calendarService: CalendarService, public _es: EventService, public _ps: ProviderService, public _au: AuthRest) {
        this.calendarConfiguration = this._calendarService.getData();

        this._ps.getList(this._au.getBranchId()).subscribe(r => {
            this.providers = r;
        });

        this.calendarConfiguration.events = (start, end, timezone, callback) => {
            this._es.getEventsByProviderId(start, end, this.provider.value).subscribe(r => {
                callback(r.data.map(result => {
                    return {start: result.event_start_at, end: result.event_end_at, title: result.summary};
                }));
            });
        };

        this.calendarConfiguration.eventRender = (event, element) => {
            jQuery(element).webuiPopover({
                title: event.name,
                placement: 'right',
                trigger: 'hover',
                content: +'<br />Start: ' + event.starts_at + '<br />End: ' + event.ends_at + '<br />Description: ' + event.description,
            });
        };
        this.calendarConfiguration.dayClick=(date, jsEvent, view)=>{
            if (view.name == 'month') {
                jQuery(this._calendar).fullCalendar('changeView', 'agendaWeek');
            }else {
                this.eventCreate.createEventByTime(date);
            }
        }
    }

    ngAfterViewInit(): void {
        this.provider.valueChanges.subscribe(r => {
            if (r) {
                jQuery(this._calendar).fullCalendar('rerenderEvents');
            }
        });
    }

    public onCalendarReady(calendar): void {
        this._calendar = calendar;
    }
}
