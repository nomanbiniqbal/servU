import {Injectable} from "@angular/core";
import {ApiService} from "../api.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {

  constructor(private api: ApiService) {
  }

  public login(userName: string, password: string): Observable<any> {
    return this.api.post("login", {
      user_name:userName,
      password:password,
    });
  }

}
