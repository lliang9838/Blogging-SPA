import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { LoginService } from "./login.service";

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  constructor(private loginService: LoginService) {}

  canActivate() {
    return this.loginService.currUser ? true : false;
  }
}
