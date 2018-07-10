import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {EventService} from "../../event.service";

@Component({
    selector: 'app-checkout-list',
    templateUrl: './checkout-list.component.html',
    styleUrls: ['./checkout-list.component.scss']
})
export class CheckoutListComponent implements OnInit {

    list: any = [];
    @Output() select = new EventEmitter<any>();
    constructor(public es: EventService) {
    }

    ngOnInit() {
        this.es.getCheckOutEvent().subscribe(r => {
            this.list = r;
        });
    }


    onSelect(event){
        this.select.emit(event);
    }
    checkOut(e){
        console.log(e);
    }


}
