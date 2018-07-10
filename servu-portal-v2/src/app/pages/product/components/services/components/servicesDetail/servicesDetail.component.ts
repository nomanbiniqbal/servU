import {Component, Input} from "@angular/core";
import "style-loader!./servicesDetail.scss";
@Component({
    selector: 'services-detail',
    templateUrl: './servicesDetail.html'
})
export class ServicesDetail {
    @Input() product;
}
