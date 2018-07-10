import {Component, Input} from "@angular/core";
import {NgModel} from "@angular/forms";
import "style-loader!./baValidationMessage.scss";

@Component({
    selector: 'ba-validation-message',
    templateUrl: './baValidationMessage.html'
})
export class BaValidationMessage {

    @Input('input') fc: NgModel;
    keys(errors){
        if (errors) {
            return Object.keys(errors);
        }else {
            return [];
        }
    }

}