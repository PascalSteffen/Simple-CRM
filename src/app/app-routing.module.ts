import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SigninComponent } from './signin/signin.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ReverseauthGuard } from './shared/guard/reverseauth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent, canActivate: [ReverseauthGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [ReverseauthGuard]},

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserDetailComponent,canActivate: [AuthGuard] },
  { path: 'imprint', component: ImprintComponent, canActivate: [AuthGuard] },
  { path: 'privacy', component: PrivacyComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
