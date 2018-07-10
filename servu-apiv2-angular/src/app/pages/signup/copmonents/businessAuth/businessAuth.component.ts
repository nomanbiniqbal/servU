import {Component, Output, EventEmitter} from "@angular/core";
import {AbstractControl, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {EmailValidator, EqualPasswordsValidator} from "../../../../theme/validators";
import "style-loader!./businessAuth.scss";
import {AjaxValidator} from "../../../../theme/validators/ajax.validator";
import {Api} from "../../../../api.service";


@Component({
  selector: 'business-auth',
  templateUrl: './businessAuth.html',
})
export class BusinessAuth {
  @Output() businessInfo = new EventEmitter<any>();

  public form: FormGroup;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;

  public submitted: boolean = false;
  private businessEmail: AbstractControl;
  private businessName: AbstractControl;

  constructor(fb: FormBuilder,api:Api) {

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required,Validators.minLength(4)]),AjaxValidator.validate("name",api)],
      'business_email': ['', Validators.compose([Validators.required, EmailValidator.validate]),AjaxValidator.validate("email",api)],
    });

    this.businessName = this.form.controls['name'];
    this.businessEmail = this.form.controls['business_email'];
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      this.businessInfo.emit(values);
      // console.log(values);
    }
  }
}
