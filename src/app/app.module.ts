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
    ViewerMenuComponent
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
