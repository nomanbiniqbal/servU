import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'app-membership-detail',
    templateUrl: './membership-detail.component.html',
    styleUrls: ['./membership-detail.component.scss']
})
export class MembershipDetailComponent implements OnInit {

    constructor() {
    }

    @Input() membership: any;

    ngOnInit() {
    }

}
