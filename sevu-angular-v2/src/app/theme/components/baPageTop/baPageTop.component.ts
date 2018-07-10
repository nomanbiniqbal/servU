import {Component, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {PopoverDirective} from "ngx-bootstrap";
import "style-loader!./baPageTop.scss";
import {GlobalState} from "../../../global.state";
import {AuthRest} from "../../../restServices/authRest.service";
import {BusinessRest} from "../../../restServices/businessRest.service";

@Component({
    selector: 'ba-page-top',
    templateUrl: './baPageTop.html',
})
export class BaPageTop {
    public userName: any;
    public bName: any;
    public aN: number;
    public showOverLay: boolean;
    public isScrolled: boolean = false;
    public isMenuCollapsed: boolean = false;
    public random = 55;
    public branches = [];
    @ViewChild('pop1') pop1: PopoverDirective;
    @ViewChild('pop2') pop2: PopoverDirective;
    @ViewChild('pop3') pop3: PopoverDirective;
    public trialEnds: string;

    constructor(public _state: GlobalState, public auth: AuthRest, public _rout: Router, public b: BusinessRest) {
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
        this.userName = this.auth.getUser().data.profile.name;
        this.bName = this.auth.getUser().data.business.name;
       // this.trialEnds= this.auth.getUser().data.business.business_plan[0].trial_ends_at;

        this._state.subscribe('popover.show', (showNumber) => {
            this.aN = showNumber;

            setTimeout(r => {
                switch (showNumber) {
                    case 1:
                        this.showOverLay = true;
                        if (this.pop1) {
                            this.pop1.show();
                        }
                        break;
                    case 2:
                        this.showOverLay = true;
                        this.pop2.show();
                        break;
                    case 3:
                        this.pop3.show();
                        this.showOverLay = true;
                        setTimeout(r => {
                            this.showOverLay = false;
                            this.auth.isStartUp = false;
                        }, 5000);
                        break;
                }

            }, 1500);
        });
        this._state.subscribe('popover.hide', (showNumber) => {
            this.showOverLay = false;
            switch (showNumber) {
                case 1:
                    if (this.pop1) {
                        this.pop1.hide();
                    }
                    break;
                case 2:
                    if (this.pop2) {
                        this.pop2.hide();
                    }
                    break;
                case 3:
                    if (this.pop3) {
                        this.pop3.hide();
                    }

                    break;
            }
        });


    }

    public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
        return false;
    }

    update() {
        this.random = this.random == 20 ? 50 : 20;
    }

    public scrolledChanged(isScrolled) {
        this.isScrolled = isScrolled;
    }

    public logout() {
        this._rout.navigate(["/login"]);
        this.auth.remove();
    }
}
