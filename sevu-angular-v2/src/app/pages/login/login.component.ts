import {Component} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import "style-loader!./login.scss";
import {AuthRest} from "../../restServices/authRest.service";

@Component({
    selector: 'login',
    templateUrl: './login.html',
})
export class Login {

    public form: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;
    public businessId: AbstractControl;
    public submitted: boolean = false;
    public progressBarSwitch: boolean = false;
    public errors: any;

    object = {
        link: "/meta/img-01.jpg"
    }

    constructor(fb: FormBuilder, public auth: AuthRest, public router: Router) {
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'business_id': ['', Validators.compose([Validators.required])],
        });

        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
        this.businessId = this.form.controls['business_id'];
    }

    public onSubmit(values: any): void {

        this.progressBarSwitch = true;
        this.submitted = true;
        if (this.form.valid) {
            this.auth.login(values).subscribe((resutl) => {
                this.router.navigate(['', 'pages']);
            }, (error: any) => {
                this.errors = error.description;
                this.progressBarSwitch = false;

            });

        }

    }

}
