import {Component} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

import "style-loader!./forgotPassword.scss";
import {AuthRest} from "../../restServices/authRest.service";

@Component({
    selector: 'forgot-password',
    templateUrl: './forgotPassword.html',
})
export class ForgotPassword {

    public form: FormGroup;
    public email: AbstractControl;
    public submitted: boolean = false;
    public errors: any;
    object = {
        link: "/meta/img-01.jpg"
    }
    public success: boolean;

    constructor(fb: FormBuilder, public auth: AuthRest) {
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        });

        this.email = this.form.controls['email'];
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
