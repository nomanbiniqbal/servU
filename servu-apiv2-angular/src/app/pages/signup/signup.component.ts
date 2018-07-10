import {Component} from "@angular/core";
import "style-loader!./signup.scss";
import {Router} from "@angular/router";

@Component({
  selector: 'signup',
  templateUrl: './signup.html'
})
export class Signup {
  state: string = 'inactive';
  show: boolean = false;


  private businessInfo: any;
  object = {
    link: "/meta/img-01.jpg"
  }
  constructor(public router: Router) {

  }

  onBusinessSubmit(value) {
    this.show = (this.show === true ? false : true);
    this.businessInfo = value;
  }

  onBusinessSetup(value) {
    this.router.navigate(['', 'pages']);
  }
}
