import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';
import { AuthGuard } from './guards/auth.guard';
import { OrganizationComponent } from './system/organization/organization.component';
import { SettingsComponent } from './settings/settings.component';
import { RoleComponent } from './system/role/role.component';

const routes: Routes = [
  { path: '', redirectTo: environment.frontEndUrl.organizations, pathMatch: 'full'},
  { path: environment.frontEndUrl.organizations, component: OrganizationComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.login, component: LoginComponent },
  { path: environment.frontEndUrl.settings, component: SettingsComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.roles, component: RoleComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
