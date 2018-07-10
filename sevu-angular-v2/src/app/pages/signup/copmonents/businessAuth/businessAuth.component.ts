import {AfterViewInit, Component, EventEmitter, Input, Output} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import "style-loader!./businessAuth.scss";
import {Api} from "../../../../api.service";
import {EmailValidator} from "../../../../theme/validators";
import {AjaxValidator} from "../../../../theme/validators/ajax.validator";


@Component({
    selector: 'business-auth',
    templateUrl: './businessAuth.html',
})
export class BusinessAuth implements AfterViewInit {

    @Output() businessInfo = new EventEmitter<any>();

    @Input() set info(i: any) {
        if (i) {
            if (this.businessName) {
                this.businessName.setValue(i.name);
            }
            if (this.businessEmail) {
                this.businessEmail.setValue(i.business_email);
            }
        }
    };

    public form: FormGroup;
    public password: AbstractControl;
    public repeatPassword: AbstractControl;
    public passwords: FormGroup;

    public submitted: boolean = false;
    public businessEmail: AbstractControl;
    public businessName: AbstractControl;

    constructor(public fb: FormBuilder, public api: Api) {
        this.form = this.fb.group({
            'name': ["", Validators.compose([Validators.required, Validators.minLength(4)]), AjaxValidator.validate("name", this.api)],
            'business_email': ["", Validators.compose([Validators.required, EmailValidator.validate]), AjaxValidator.validate("email", this.api)],
        });

        this.businessName = this.form.controls['name'];
        this.businessEmail = this.form.controls['business_email'];

    }

    ngAfterViewInit(): void {
    }

    public onSubmit(values: Object): void {
        this.submitted = true;
        if (this.form.valid) {
            this.businessInfo.emit(values);
        }
    }
}
