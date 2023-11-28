import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ErrorComponent } from './Components/error/error.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { RecipeListComponent } from './Components/recipe-list/recipe-list.component';
import { LogInComponent } from './Components/log-in/log-in.component';

const routes: Routes = [
  {path:'admin',component:HomeComponent,children:[
    {path:'dashboard',component:DashboardComponent},
    {path:'userlist',component:UserListComponent},
    {path:'recipelist',component:RecipeListComponent},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', component: ErrorComponent },
    
  ]},
  {path:'adminlogin',component:LogInComponent},
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
