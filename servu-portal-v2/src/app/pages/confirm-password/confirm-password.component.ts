import {Component} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EqualPasswordsValidator} from "app/theme/validators";

import "style-loader!./confirm-password.scss";
import {AuthRest} from "../../restServices/authRest.service";

@Component({
    selector: 'confirm-password',
    templateUrl: './confirm-password.html',
})
export class ConfirmPassword {

    public form: FormGroup;
    public submitted: boolean = false;
    public errors: any;
    object = {
        link: "/meta/img-01.jpg"
    }
    public success: boolean;

    constructor(fb: FormBuilder, public auth: AuthRest) {
        this.form = fb.group({
            'passwords': fb.group({
                'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
                'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
            }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})

        });
    }

    public onSubmit(values: any): void {
        this.submitted = true;
        if (this.form.valid) {
            this.auth.forgotPassword(values).subscribe((resutl) => {
                this.success = true;
            }, (error: any) => {
                this.errors = error.description;
            });
        }
    }
}
