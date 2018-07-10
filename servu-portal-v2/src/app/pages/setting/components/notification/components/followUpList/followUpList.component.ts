/**
 * Created by Mian on 3/9/2017.
 */
/**
 * Created by Mian on 3/8/2017.
 */
import {Component} from "@angular/core";
import "style-loader!./followUpList.scss";
import {FollowUpService} from "../../followUp.service";


@Component({
    selector: 'followUp-list',
    templateUrl: './followUpList.html'
})
export class followUpList {
    public list: (any)[];

    constructor(public _reminderService: FollowUpService) {
    }

    ngOnInit() {
        this.list = this._reminderService.getData();
    }
}
