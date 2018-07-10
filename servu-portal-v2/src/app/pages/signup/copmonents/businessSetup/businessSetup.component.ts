import {Component, EventEmitter, Input, Output} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TypeaheadMatch} from "ngx-bootstrap";
import "style-loader!./businessSetup.scss";
import {AuthRest} from "../../../../restServices/authRest.service";
import {EmailValidator} from "../../../../theme/validators/email.validator";
import {EqualPasswordsValidator} from "../../../../theme/validators/equalPasswords.validator";
import {PhoneValidator} from "../../../../theme/validators/phone.validator";

@Component({
    selector: 'business-setup',
    templateUrl: './businessSetup.html',
})
export class BusinessSetup {
    public form: FormGroup;
    public countries = [];
    @Output() businessSetup = new EventEmitter<any>();
    @Output() back = new EventEmitter<any>();
    @Input() businessInfo;
    public zones = [];
    public personal: AbstractControl;
    public country_id: string;
    public searchingZones: boolean;
    public progressBarSwitch: boolean = false;
    public errors = [];
    public mask = ['(', /[1-9]/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    constructor(public fb: FormBuilder, public _signUPService: AuthRest) {
        this.form = fb.group({
            "personal_name": ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            "email": ['', Validators.compose([Validators.required, Validators.minLength(4), EmailValidator.validate])],
            "telephone": ['', Validators.compose([Validators.required, PhoneValidator.validate])],
            "address": ['', Validators.required],
            "country_id": ['', Validators.required],
            "zone_id": ['', Validators.required],
            'passwords': fb.group({
                'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
                'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
            }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
        });
        this.personal = this.form.controls['personal_name'];
        this._signUPService.getCountry().subscribe((result) => {
            this.countries = result.data;
        });
    }

    onCountrySelect(val: TypeaheadMatch) {
        this.country_id = val.item.id;
        this.searchingZones = true;
        this._signUPService.getZone(this.country_id).subscribe((result) => {
            this.zones = result.data;
            this.form.controls['zone_id'].setValue('');
            this.searchingZones = false;
        });
    }

    onSubmit(value) {
        this.progressBarSwitch = true;
        this._signUPService.businessSetup(Object.assign(this.businessInfo, value, {country_id: this.country_id})).subscribe((result) => {
            this.businessSetup.emit(result);
        }, (error: any) => {
            this.progressBarSwitch = false;
            this.errors = error.description;
        });
    }

    onBack() {
        this.back.emit("yes");
    }
}
