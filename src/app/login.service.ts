import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  currUser: string = null;

  private url = "http://localhost:3000/login/";

  constructor(private http: HttpClient) {}

  login(username, password): void {
    let body = {
      username: username,
      password: password,
    };
    const loginReq = this.http.post(this.url, body, {
      observe: "response",
      responseType: "text",
    });

    loginReq.subscribe((ret) => {
      if (ret.status === 200) {
        this.currUser = username;
      }
    });
  }
}
