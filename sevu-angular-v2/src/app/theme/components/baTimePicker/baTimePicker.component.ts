import {Component, ElementRef, forwardRef, Input, ViewChild} from "@angular/core";
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";

import "clockpicker/dist/jquery-clockpicker.js";
import * as moment from "moment";

import "style-loader!./baTimePicker.scss";

@Component({
    selector: 'ba-time-picker',
    templateUrl: './baTimePicker.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BaTimePicker),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => BaTimePicker),
            multi: true
        }
    ]
})
export class BaTimePicker implements ControlValueAccessor {

    @ViewChild('timePicker') public _selector: ElementRef;
    public propagateChange = (_: any) => {
    };
    public propagateTouched = (_: any) => {
    };
    public input: any;
    public counterValue: string;
    public _after: any;
    public _before: any;

    @Input() extraClass: string;
    @Input()
    set after(a) {
        this._after = a;
        if (this.c) {
            this.c.updateValueAndValidity(true);
        }
    };

    @Input() set before(b){
        this._before = b;
        if (this.c) {
            this.c.updateValueAndValidity(true);
        }
    };
    public c: FormControl;

    constructor() {
    }

    validate(c: FormControl): any {
        this.c = c;
        if (c.value) {
            if (this._after) {
                let currentTime = moment(c.value, "HH:mm");
                let afterTime = moment(this._after, "HH:mm");
                if (currentTime.isAfter(afterTime)) {
                    return {
                        afterError: {
                            to: this._after
                        }
                    }
                }

            }
            if (this._before) {
                let currentTime = moment(c.value, "HH:mm");
                let beforeTime = moment(this._before, "HH:mm");
                if (currentTime.isBefore(beforeTime)) {
                    return {
                        beforeError: {
                            to: this._before
                        }
                    }
                }
            }

        }

        return null;
    }

    ngAfterViewInit() {
        this.input = jQuery(this._selector.nativeElement).clockpicker({
            beforeShow: () => {
                this.propagateTouched(true);
            },
            afterDone: (w) => {
                this.propagateChange(moment(this.input.find('input').val(), "HH:mm").format("HH:mm:ss"));
            }
        });
    }

    writeValue(val: string): void {
      if (this.input) {
            this.counterValue = "";
            if (val) {
                this.counterValue = moment(val, "HH:mm:ss").format("HH:mm");
            }
            this.input.clockpicker("default", this.counterValue)
        }
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.propagateTouched = fn;

    }

}
