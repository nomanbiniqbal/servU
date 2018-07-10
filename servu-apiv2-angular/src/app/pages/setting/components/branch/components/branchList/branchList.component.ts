import {Component} from "@angular/core";
import {BranchService} from "../../branch.service";
import 'style-loader!./branchList.scss';
@Component({
  selector: 'branch-list',
  templateUrl: './branchList.html'
})
export class BranchList {
  private list: (any)[];

  constructor(public _branchService: BranchService) {
  }

  ngOnInit() {
    this.list = this._branchService.getData();
  }
}
