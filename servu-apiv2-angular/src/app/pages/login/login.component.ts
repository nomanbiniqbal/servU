import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import 'style-loader!./login.scss';
import {AuthRest} from "../../restServices/authRest.service";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public businessId: AbstractControl;
  public submitted:boolean = false;
  public progressBarSwitch:boolean=false;
  private errors: any;
  object = {
    link: "/meta/img-01.jpg"
  }

  constructor(fb:FormBuilder,private auth:AuthRest,private router:Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'business_id': ['', Validators.compose([Validators.required])],
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.businessId = this.form.controls['business_id'];
  }

  public onSubmit(values:any):void {
    this.submitted = true;
    if (this.form.valid) {
      this.auth.login(values).subscribe((resutl)=>{
        this.router.navigate(['', 'pages']);
      },(error:any)=>{
        this.errors = error.description;
      });

    }
  }
  public progressbar()
  {
    this.progressBarSwitch=!this.progressBarSwitch;
  }
}
