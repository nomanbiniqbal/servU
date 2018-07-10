import {Component, forwardRef, Input} from "@angular/core";
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";
import * as _ from "lodash";
import {TypeaheadMatch} from "ngx-bootstrap";
import {AuthRest} from "../../../restServices/authRest.service";

@Component({
    selector: 'ba-country-input',
    templateUrl: './baCountryInput.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BaCountryInput),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => BaCountryInput),
            multi: true
        }
    ]
})
export class BaCountryInput implements ControlValueAccessor {


    public countries: any = [];
    public selected: any = '';
    @Input() phoneOnly: boolean;
    private populateChange = (_: any) => {
    };
    private populateTouched = (_: any) => {
    };
    private selectedId: any;

    constructor(public _au: AuthRest) {
        _au.getCountry().subscribe((l: any) => {
            this.countries = l.data;
            this.applySelection();
        });
    }

    onCountrySelect(val: TypeaheadMatch) {
        this.selected = val.value;
        if (this.phoneOnly) {
            this.populateChange(this.selected);
            return
        }
        this.populateChange(val.item.id);
    }

    writeValue(obj: any): void {
        this.selectedId = obj;
        this.applySelection()
    }

    applySelection() {
        if (this.phoneOnly) {
            this.selected = this.selectedId;
        } else {
            this.selected = '';
            if (this.countries && this.selectedId) {
                var search: any = {id: this.selectedId};
                var item = _.find(this.countries, search);
                if (item) {
                    this.selected = item['name'];
                }
            }
        }
    }

    registerOnChange(fn: any): void {
        this.populateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.populateTouched = fn;
    }

    validate(c: FormControl): any {
        return null;
    }

    setDisabledState(isDisabled: boolean): void {
        // throw new Error('Method not implemented.');
    }
}