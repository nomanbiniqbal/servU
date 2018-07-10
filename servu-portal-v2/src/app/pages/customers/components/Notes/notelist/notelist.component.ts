import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {CustomerService} from "../../../customer.service";
import {FormGroup} from "@angular/forms";
import {ProviderService} from "../../../../provider/provider.service";
import {AuthRest} from "../../../../../restServices/authRest.service";
import * as _ from "lodash";

@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.scss']
})
export class NotelistComponent implements OnInit {
  public selectedCustomerNotes:any =[];
  public note:any =[];
  public providerlist:any =[];
  public list:any =[];
  public userid :any;
  @ViewChild('notesCreateModal') Notemodel;

  constructor(public _cs :CustomerService, public _au:AuthRest) {

  }

  ngOnInit() {
    this.providerList();
  }



  @Input()
  set selectedcustomerid(id) {

    if (id) {
      this.providerList();
      this._cs.getNotesbyId(id).subscribe(c => {
        this.selectedCustomerNotes = c;
      });
    }
  }

  createPoup(val){
    this.userid = val.id;
    this.Notemodel.show();
  }

  submitNote(val , form :FormGroup) {
    if (!val.id) {
      this._cs.createNotes(val).subscribe((r) => {
        this.Notemodel.hide();

      });
      return
    }
    this._cs.updateNotes(val).subscribe((r) => {
      this.Notemodel.hide();
    });
  }

  editNotes(val) {
    this.note = val;
    this.Notemodel.show();
  }

  providerList(){
    this._cs.getListProvider(this._au.getBranchId()).subscribe((list: any) => {
      list = _.filter(list, (r: any) => {
        return r.business_user.length > 0;
      });
      this.providerlist = list;
      this.list =list;
    });
  }

  search(s) {
    this.list = _.filter(this.providerlist, (o: any) => {
      if (s) {
        return _.startsWith(_.lowerCase(o.name), _.lowerCase(s));
      }
      return true;
    });
  }

  deletenote(id) {
    this._cs.deletenote(id).subscribe((r) => {
      this.Notemodel.hide();
    });
  }

}
