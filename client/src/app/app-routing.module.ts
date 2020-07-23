import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EmployeeCreateComponent } from "./components/employee-create/employee-create.component";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { EmployeeEditComponent } from "./components/employee-edit/employee-edit.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "list" },
  { path: "create", component: EmployeeCreateComponent },
  { path: "edit/:id", component: EmployeeEditComponent },
  { path: "list", component: EmployeeListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
