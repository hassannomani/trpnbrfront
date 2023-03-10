import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './uitools/button/button.component';
import { AddAgentComponent } from './agent/add-agent/add-agent.component';
import { ToolbarComponent } from './layouts/toolbar/toolbar.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { ListAgentComponent } from './agent/list-agent/list-agent.component';
import { AddRepresentativeComponent } from './representative/add-representative/add-representative.component';
import { ListRepresentativeComponent } from './representative/list-representative/list-representative.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ResetUserComponent } from './user/reset-user/reset-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { LogoutComponent } from './layouts/logout/logout.component';
import { AgentMenuComponent } from './layouts/agent-menu/agent-menu.component';
import { AdminMenuComponent } from './layouts/admin-menu/admin-menu.component';
import { RepresentativeMenuComponent } from './layouts/representative-menu/representative-menu.component';
import { ViewerMenuComponent } from './layouts/viewer-menu/viewer-menu.component';
import { ApproveRepresentativeComponent } from './representative/approve-representative/approve-representative.component';
import { ApproveRepresentativeSingleComponent } from './representative/approve-representative-single/approve-representative-single.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { AgentRepresentativeComponent } from './agent/agent-representative/agent-representative.component';
import { AgentLedgerComponent } from './ledger/agent-ledger/agent-ledger.component';
import { AdminLedgerComponent } from './ledger/admin-ledger/admin-ledger.component';
import { RepresentativeLedgerComponent } from './ledger/representative-ledger/representative-ledger.component';
import { EditAgentComponent } from './agent/edit-agent/edit-agent.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ButtonComponent,
    AddAgentComponent,
    ToolbarComponent,
    MenuComponent,
    ListAgentComponent,
    AddRepresentativeComponent,
    ListRepresentativeComponent,
    AddUserComponent,
    ResetUserComponent,
    ListUserComponent,
    LogoutComponent,
    AgentMenuComponent,
    AdminMenuComponent,
    RepresentativeMenuComponent,
    ViewerMenuComponent,
    ApproveRepresentativeComponent,
    ApproveRepresentativeSingleComponent,
    DashboardComponent,
    AgentRepresentativeComponent,
    AgentLedgerComponent,
    AdminLedgerComponent,
    RepresentativeLedgerComponent,
    EditAgentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
