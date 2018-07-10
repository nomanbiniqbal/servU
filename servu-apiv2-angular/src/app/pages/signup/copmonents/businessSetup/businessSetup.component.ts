import {Component, Output, EventEmitter, Input} from "@angular/core";
import "style-loader!./businessSetup.scss";
import {FormBuilder, FormGroup, Validators, AbstractControl} from "@angular/forms";
import {EqualPasswordsValidator} from "../../../../theme/validators/equalPasswords.validator";
import {SignUpService} from "../../signup.service";
import {TypeaheadMatch} from "ng2-bootstrap";
import {EmailValidator} from "../../../../theme/validators/email.validator";
import {AuthRest} from "../../../../restServices/authRest.service";

@Component({
  selector: 'business-setup',
  templateUrl: './businessSetup.html',
})
export class BusinessSetup {
  private form: FormGroup;
  private countries = [];
  @Output() businessSetup = new EventEmitter<any>();
  @Input() businessInfo;
  private zones = [];
  private personal: AbstractControl;
  private country_id: string;
  private searchingZones: boolean;
  private errors = [];

  constructor(private fb: FormBuilder, private _signUPService: AuthRest) {
    this.form = fb.group({
      "personal_name": ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      "email": ['', Validators.compose([Validators.required, Validators.minLength(4), EmailValidator.validate])],
      "telephone": ['', Validators.required],
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
    this._signUPService.businessSetup(Object.assign(this.businessInfo, value, {country_id: this.country_id})).subscribe((result) => {
      this.businessSetup.emit(result);
    }, (error: any) => {
      this.errors = error.description;
    });
  }
}
