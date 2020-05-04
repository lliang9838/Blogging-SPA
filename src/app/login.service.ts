import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  currUser: string = null;

  private url = "http://localhost:8080/";

  constructor(private http: HttpClient, private router: Router) {
    if (document.cookie) this.currUser = parseJWT(document.cookie)["usr"]; //got username here
  }

  login(username, password): void {
    let body = {
      username: username,
      password: password,
    };

    let loginUrl = this.url + "login/";

    const loginReq = this.http.post(loginUrl, body, {
      observe: "response",
      responseType: "text",
      withCredentials: true,
    });

    loginReq.subscribe((ret) => {
      if (ret.status === 200) {
        this.currUser = username;
        this.router.navigate(["/"]);
      }
    });
  }

  logout(): void {
    let logoutUrl = this.url + "logout/";

    let body = {};
    const logoutReq = this.http.post(logoutUrl, body, {
      observe: "response",
      responseType: "text",
      withCredentials: true,
    });

    logoutReq.subscribe((ret) => {
      console.log(ret);
      if (ret.status === 200) {
        this.currUser = null;
        location.reload();
      }
    });
  }
}

function parseJWT(token) {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(base64));
}
