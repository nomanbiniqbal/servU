/**
 * Created by Mian on 2/23/2017.
 */
/**
 * Created by Mian on 2/23/2017.
 */
import {Component} from "@angular/core";
import "style-loader!./today.scss";

@Component({
  selector: "today",
  templateUrl: "./today.html"
})
export class Today {
  private list = [
    {
      label: 'serv1',
      type: 'ser',
    }, {
      label: 'serv2',
      type: 'ser',
    }, {
      label: 'serv3',
      type: 'ser',
    }, {
      label: 'serv4',
      type: 'ser',
    },
    {
      label: 'cat1',
      type: 'cat',
      services: [
        {
          label: 'servi1'
        },
        {
          label: 'servi1'
        },
        {
          label: 'servi1'
        },
        {
          label: 'servi1'
        },
        {
          label: 'servi1'
        },
        {
          label: 'servi1'
        },
        {
          label: 'servi1'
        },
        {
          label: 'servi1'
        },

      ]
    },
    {
      label: 'cat2',
      type: 'cat',
      services: [
        {
          label: 'servi1'
        },
        {
          label: 'servi1'
        },
        {
          label: 'servi1'
        },
        {
          label: 'servi1'
        },
        {
          label: 'servi1'
        },
        {
          label: 'servi1'
        },
        {
          label: 'servi1'
        },
        {
          label: 'servi1'
        },

      ]
    }
  ]

}
