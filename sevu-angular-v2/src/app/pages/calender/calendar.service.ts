import {Injectable} from "@angular/core";
import {BaThemeConfigProvider} from "../../theme/theme.configProvider";

@Injectable()
export class CalendarService {

    constructor(public _baConfig: BaThemeConfigProvider) {
    }

    getData() {
        let dashboardColors = this._baConfig.get().colors.dashboard;
        return {
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            selectHelper: true,
            editable: false,
            height: 'auto',
        };
    }
}
