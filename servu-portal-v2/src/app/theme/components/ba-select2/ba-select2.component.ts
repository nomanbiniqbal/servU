import {Component, ElementRef, EventEmitter, forwardRef, Input, NgZone, Output, ViewChild} from "@angular/core";
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";
import * as _ from "lodash";
import "style-loader!./ba-select2.component.scss";

@Component({
    selector: 'ba-select2',
    templateUrl: './ba-select2.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BaSelect2),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => BaSelect2),
            multi: true
        }
    ]

})
export class BaSelect2 implements ControlValueAccessor {

    @ViewChild('selectId') public _selector: ElementRef;
    private select2: any;
    private populateChange = (_: any) => {
    };
    private populateTouched = (_: any) => {
    };

    private _placeholder: any;
    public selectedModal: any;
    private _options: [any];

    @Input() set placeholder(p) {
        this._placeholder = p;
    };

    @Input() fieldName: string;
    @Input() modalFieldName: string;
    public items: any = [];
    @Input() set options(i: [any]) {
        this._options = i;
        var fields = this.fieldName.split(',');
        this.items = _.map(i, l => {
            return {
                id: l[this.modalFieldName],
                text: `${l[fields[1]] ? '+' + l[fields[1]] + ' - ' : ''} ${l[fields[0]]}`
            }
        });
    };

    @Output() onSelect = new EventEmitter<any>();


    ngAfterViewInit() {
        this.select2 = jQuery(this._selector.nativeElement).select2({
            placeholder: this._placeholder,
            allowClear: true,
        });
        this.select2.on("select2:select", (s) => {
            this.zone.run(()=>{
                var val = this.select2.val();
                this.populateChange(val);
                var predicate;
                if (_.isNaN(_.parseInt(val))) {
                    predicate = {[this.modalFieldName]: val};
                } else {
                    predicate = {[this.modalFieldName]: parseInt(val)};
                }
                var value = _.find(this._options, predicate);
                this.onSelect.emit(value);
            })
        });

        this.select2.on("select2:unselect", (s) => {
            this.populateChange("");
        });

        this.select2.on("select2:open", (s) => {
            this.populateTouched(true);
        });

        if (this.selectedModal) {
            this.select2.val(this.selectedModal + "");
            this.select2.trigger('change');
        }
    }


    writeValue(obj: any): void {
        this.selectedModal = obj;
        if (this.select2) {
            this.select2.val(this.selectedModal + "");
            this.select2.trigger('change');
            if (this.selectedModal) {
                var predicate;
                if (_.isNaN(_.parseInt(this.selectedModal))) {
                    predicate = {[this.modalFieldName]: this.selectedModal};
                } else {
                    predicate = {[this.modalFieldName]: parseInt(this.selectedModal)};
                }
                var value = _.find(this._options, predicate);
                this.onSelect.emit(value);
            }
        }
    }

    registerOnChange(fn: any): void {
        this.populateChange = fn;

        // throw new Error('Method not implemented.');
    }

    registerOnTouched(fn: any): void {
        this.populateTouched = fn;
        // throw new Error('Method not implemented.');
    }

    validate(c: FormControl): any {
        return null;
    }

    setDisabledState(isDisabled: boolean): void {
        // throw new Error('Method not implemented.');
    }


    constructor(public zone:NgZone) {
    }


}
