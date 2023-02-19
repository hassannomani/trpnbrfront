import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAgentComponent } from './agent/add-agent/add-agent.component';
import { LoginComponent } from './auth/login/login.component';
import { AddRepresentativeComponent } from './representative/add-representative/add-representative.component';
import { AddUserComponent } from './user/add-user/add-user.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "add-agent", component: AddAgentComponent},
  {path: "add-representative", component: AddRepresentativeComponent},
  {path: "add-user", component: AddUserComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
