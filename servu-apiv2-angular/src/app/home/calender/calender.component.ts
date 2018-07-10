import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  name: string;

  ngOnInit() {
    this.route.params.subscribe((p:any) => {
      this.name= p.name;
    })
  }

}
