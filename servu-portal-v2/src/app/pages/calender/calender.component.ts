import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {NgModel} from "@angular/forms";
import * as _ from "lodash";
import * as moment from "moment";
import {extendMoment} from "moment-range";
import "style-loader!./calender.scss";
import {AuthRest} from "../../restServices/authRest.service";
import {ProviderService} from "../provider/provider.service";
import {EventService} from "../today/event.service";
import {CalendarService} from "./calendar.service";
import {EventCreatePopupComponent} from "app/pages/today/component/event-create-popup/event-create-popup.component";
const momentR = extendMoment(moment);

@Component({
    selector: "calender",
    templateUrl: "./calender.html"
})
export class Calender implements AfterViewInit {
    eventLoading: boolean;
    providers: any = [];
    public calendarConfiguration: any;
    public _calendar: Object;
    @ViewChild('provider') provider: NgModel;
    @ViewChild('event') eventCreate: EventCreatePopupComponent;

    constructor(public _calendarService: CalendarService, public _es: EventService, public _ps: ProviderService, public _au: AuthRest) {
        this.calendarConfiguration = this._calendarService.getData();
        this.calendarConfiguration.dayRender = (date, cell) => {
            if (date.isBefore(moment(), 'days')) {
                jQuery(cell).addClass('disable-cell');
            }
        };
        this._ps.getList(this._au.getBranchId()).subscribe(r => {
            this.providers = r;
        });

        this.calendarConfiguration.events = (start, end, timezone, callback) => {
            this.eventLoading = true;
            this._es.getEventsByProviderId(start, end, this.provider.value).subscribe(r => {
                this.eventLoading = false;
                callback([...r.data.map(result => {
                    return Object.assign(this.getEventColor(result), {
                        start: result.event_start_at,
                        end: result.event_end_at,
                        title: result.summary,
                        src: result,
                    });
                }),
                    ...this.getEventsBackgound(start, end)
                ]);
            });
        };

        this.calendarConfiguration.eventRender = (event, element) => {
            if (event.src) {
                var providers = event.src.event_organizer.map(r => {
                    return r.business_user.user.name
                }).join(',');

                var products = event.src.event_product.map(r => {
                    return r.business_product.name
                }).join(',');

                jQuery(element).webuiPopover({
                    title: event.title,
                    placement: 'top',
                    trigger: 'hover',
                    animation: 'pop',
                    style: this.getEventColor(event.src).type,
                    content: `
                <small>
                <b>Appointment Services:</b>${products}
                <br>
                <b>Ends At</b> ${moment(event.src.event_end_at, 'YYYY-MM-DD HH:mm:ss').format('MMMM DD, YYYY LT')}
                <br>
                <b>Status</b> ${event.src.event_status}
                <br>
                <b>Providers</b> ${providers}
                </small>`,
                });
            }
        };
        this.calendarConfiguration.dayClick = (date, jsEvent, view) => {
            if (view.name == 'month' || view.name == "agendaWeek") {
                jQuery(this._calendar).fullCalendar('changeView', 'agendaDay', date);
            } else {
                if (date.isAfter(moment(), 'days')) {
                    if (!this.IsDateHasEvent(date)) {
                        this.eventCreate.createNew(date);
                    }

                }
            }
        }
    }

    ngAfterViewInit(): void {
        this.provider.valueChanges.subscribe(r => {
            if (r) {
                this.refresh()
            }
        });
    }
    public refresh(){
        jQuery(this._calendar).fullCalendar('refetchEvents');
    }

    public onCalendarReady(calendar): void {
        this._calendar = calendar;
    }

    public getEventColor(e) {
        if (e.checkout_at) {
            return {
                textColor: "#4E4D4B",
                color: '#F1F0F0',
                type: 'gray'
            };
        }
        if (e.checkin_at) {
            return {
                textColor: "#2F6C23",
                color: '#DAF6D0',
                type: 'green'
            };

        }
        if (e.event_status == 'Cancelled') {
            return {
                textColor: "#910A18",
                color: '#FFE0E6',
                type: 'red'
            };
        }
        return {
            textColor: "#16607D",
            color: '#E5F5FC',
            type: 'blue'
        };

    }

    public getEventsBackgound(start, end) {
        var events = [];
        var branchDetails = this._au.branchDetails();
        if (branchDetails) {
            do {
                let week = start.get('day');
                if (week == 0) {
                    week = 7;
                }
                var find: any = _.find(branchDetails.business_location_schedule, {week_day_id: week});
                if (find) {
                    if (find.is_open) {
                        events.push({
                            color: 'gray',
                            blocked: true,
                            start: moment(`${start.format('YYYY-MM-DD')} 00:00:00`),
                            end: moment(`${start.format('YYYY-MM-DD')} ${find.open_at}`),
                            rendering: "background",
                        });
                        events.push({
                            color: 'gray',
                            blocked: true,
                            start: moment(`${start.format('YYYY-MM-DD')} ${find.close_at}`),
                            end: moment(`${start.format('YYYY-MM-DD')} 24:00:00`),
                            rendering: "background",
                        });

                    } else {
                        events.push({
                            color: 'gray',
                            blocked: true,
                            start: moment(`${start.format('YYYY-MM-DD')} 00:00:00`),
                            end: moment(`${start.format('YYYY-MM-DD')} 24:00:00`),
                            rendering: "background",
                        });

                    }
                }
                start.add(1, 'day');
            } while (start.isBefore(end));

        }
        return events;
    }

    private IsDateHasEvent(date: any) {
        date = moment(date.format('L LT'), 'L LT');
        var allEvents = [];
        allEvents = jQuery(this._calendar).fullCalendar('clientEvents');
        var event = allEvents.filter(e => {
            return momentR.range(e.start, e.end).contains(date, {exclusive: true});
        });
        return event.length > 0;
    }
}
