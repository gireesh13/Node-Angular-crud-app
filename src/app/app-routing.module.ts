import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import {AuthGuard} from './shared/auth.guard'

const routes: Routes = [
  {path:'',component:LoginComponent}, 
{path:'dashboard',component:DashboardComponent,canActivate: [AuthGuard]}, 
{path:'user-list',component:UserListComponent,canActivate: [AuthGuard]}, 
{path:'login',component:LoginComponent}, 
// {path:'user-profile/:id',component:UserProfileComponent},
{path:'register',component:RegisterComponent}, 
{ path: 'customer', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),canLoad: [AuthGuard] }, 
{ path: 'payments', loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule) ,canLoad: [AuthGuard]}, 
{ path: 'loans', loadChildren: () => import('./loans/loans.module').then(m => m.LoansModule),canLoad: [AuthGuard]},
{
  path:'**', component:NotFoundComponentComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
