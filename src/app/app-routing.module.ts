import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAgentComponent } from './agent/add-agent/add-agent.component';
import { AgentRepresentativeComponent } from './agent/agent-representative/agent-representative.component';
import { EditAgentComponent } from './agent/edit-agent/edit-agent.component';
import { ListAgentComponent } from './agent/list-agent/list-agent.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './layouts/logout/logout.component';
import { AdminLedgerComponent } from './ledger/admin-ledger/admin-ledger.component';
import { AgentLedgerComponent } from './ledger/agent-ledger/agent-ledger.component';
import { RepresentativeLedgerComponent } from './ledger/representative-ledger/representative-ledger.component';
import { ReportAdminComponent } from './report/report-admin/report-admin.component';
import { AddRepresentativeComponent } from './representative/add-representative/add-representative.component';
import { ApproveRepresentativeSingleComponent } from './representative/approve-representative-single/approve-representative-single.component';
import { ApproveRepresentativeComponent } from './representative/approve-representative/approve-representative.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ListUserComponent } from './user/list-user/list-user.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "add-agent", component: AddAgentComponent},
  {path: "add-representative", component: AddRepresentativeComponent},
  {path: "add-user", component: AddUserComponent},
  {path: "users", component: ListUserComponent},
  {path: "logout", component: LogoutComponent},
  {path: "list-agents", component: ListAgentComponent},
  {path: "approve-representatives", component: ApproveRepresentativeComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "approve-representative-details", component: ApproveRepresentativeSingleComponent},
  {path: "agent-representative", component: AgentRepresentativeComponent},
  {path: "ledger-agent", component: AgentLedgerComponent},
  {path: "ledger-admin", component: AdminLedgerComponent},
  {path: "ledger-representative", component: RepresentativeLedgerComponent},
  {path: "edit-agent", component: EditAgentComponent},
  {path: "report-admin", component: ReportAdminComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
