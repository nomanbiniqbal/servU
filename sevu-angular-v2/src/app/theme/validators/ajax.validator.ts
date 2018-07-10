import {AbstractControl} from "@angular/forms";
import {Observable} from "rxjs";
import {Api} from "../../api.service";


export class AjaxValidator {
  public static o: Observable<any>;

  public static validate(by: string, api: Api) {
    let request;
    return (c: AbstractControl) => {
      this.o = new Observable((observable) => {
        c.markAsPending(true);
        if (request) {
          request.unsubscribe();
        }
        request = api.post(Api.PORTAL_TYPE.open,"availability", {
          [by]: c.value
        }).subscribe(result=>{
          observable.next(null);
          observable.complete()
        },error=>{
          observable.next({ajaxError: error.description[0]});
          observable.complete()
        });
      });
      return this.o;
    }
  }
}
