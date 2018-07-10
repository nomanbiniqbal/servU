/**
 * Created by Mian on 3/15/2017.
 */
import {Injectable} from "@angular/core";
@Injectable()
export class classesService {
  private _dataList = [
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
  public getServices(){
    return this._dataList;
  }
}
