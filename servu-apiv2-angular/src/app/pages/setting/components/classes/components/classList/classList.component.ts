/**
 * Created by Mian on 3/15/2017.
 */
import {Component} from "@angular/core";

import {classesService} from "../../classes.service";
@Component({
  selector: 'classes-list',
  templateUrl: 'classList.html'
})
export class ClassesList {
  private list=[];

  constructor(public _ss:classesService) {
    this.list = _ss.getServices();
  }

}
