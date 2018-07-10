import {Injectable} from "@angular/core";
import {BaThemeConfigProvider} from "../../theme/theme.configProvider";
import * as moment from 'moment';
@Injectable()
export class CalendarService {

    constructor(public _baConfig: BaThemeConfigProvider) {
    }

    getData() {
        return {
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            selectHelper: true,
            editable: false,
            height: 600
        };
    }
}
