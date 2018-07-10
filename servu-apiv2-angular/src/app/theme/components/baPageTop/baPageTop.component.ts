import {Component} from "@angular/core";
import {GlobalState} from "../../../global.state";
import "style-loader!./baPageTop.scss";
import {AuthRest} from "../../../restServices/authRest.service";
import {audit} from "rxjs/operator/audit";
import {Router} from "@angular/router";

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
})
export class BaPageTop {

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;
  public random = 55;

  constructor(private _state: GlobalState,private auth:AuthRest,private _rout:Router) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  update() {
    this.random = this.random == 20?50:20;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
  public logout(){
    this._rout.navigate(["/login"]);
    this.auth.remove();
  }
}
