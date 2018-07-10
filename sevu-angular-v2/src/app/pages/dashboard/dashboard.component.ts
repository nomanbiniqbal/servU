import {AfterViewInit, Component} from "@angular/core";
import {GlobalState} from "../../global.state";
import {AuthRest} from "../../restServices/authRest.service";

@Component({
    selector: 'dashboard',
    styleUrls: ['./dashboard.scss'],
    templateUrl: './dashboard.html'
})
export class Dashboard implements AfterViewInit {


    constructor(public _state: GlobalState, public ar: AuthRest) {

    }

    ngAfterViewInit(): void {
        if (this.ar.isStartUp) {
            this._state.notifyDataChanged('popover.show', 1);
        }
    }

}
