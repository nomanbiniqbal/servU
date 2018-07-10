import {Component, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {ModalDirective} from "ngx-bootstrap";
import "style-loader!./switchBranch.scss";
import {AuthRest} from "../../restServices/authRest.service";
import {BusinessRest} from "../../restServices/businessRest.service";

@Component({
    selector: 'switch-branch',
    templateUrl: './SwitchBranch.html',
})
export class SwitchBranch {
    @ViewChild('smModal') childModal: ModalDirective;

    public errors: any;
    public list = [];
    public selected: any;
    public loading: boolean;

    constructor(public router: Router, public _br: BusinessRest, public _au: AuthRest) {
        this.loading = true;
        _br.getBranchesList().subscribe((r: any) => {
            this.loading = false;
            this.list = r.data;
        });
    }

    public switchMe(values: any): void {
        this.selected = values;
        this.childModal.show();
    }

    public confirmMe() {
        this._br.switchBranch(this.selected).subscribe((r: any) => {
            this.router.navigate(['', 'pages']);
            this._au.updateUserBranchId(this.selected.id);
        });

    }
}