import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditComponent } from "./edit/edit.component";
import { PreviewComponent } from "./preview/preview.component";
import { CanActivateViaAuthGuard } from "./can-activate-via-auth-guard";

const routes: Routes = [
  {
    path: "edit/:id",
    component: EditComponent,
    canActivate: [CanActivateViaAuthGuard],
  },
  {
    path: "preview/:id",
    component: PreviewComponent,
    canActivate: [CanActivateViaAuthGuard],
  },
];

@NgModule({
  //useHash is the reason why we can have a little hash tag symbol
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
