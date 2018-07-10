import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ba-card',
  templateUrl: './baCard.html',
})
export class BaCard {
  @Input() title:String;
  @Input() baCardActionClass:String;
  @Input() baCardClass:String;
  @Input() cardType:String;
  @Output() onAction=new EventEmitter<any>();
  private _onActionClick(){
    this.onAction.emit("");
  }
}
