import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";

import { ListComponent } from "./list/list.component";
import { EditComponent } from "./edit/edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { PreviewComponent } from "./preview/preview.component";
import { LoginComponent } from "./login/login.component"; // <-- NgModel lives here
import { CanActivateViaAuthGuard } from "./can-activate-via-auth-guard";

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    EditComponent,
    PreviewComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [CanActivateViaAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
