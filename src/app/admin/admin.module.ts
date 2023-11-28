import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from '../admin/Components/dashboard/dashboard.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { RecipeListComponent } from './Components/recipe-list/recipe-list.component';
import { HomeComponent } from './Components/home/home.component';
import { ErrorComponent } from './Components/error/error.component';
import { RecipeDialogComponent } from './Dialog/recipe-dialog/recipe-dialog.component';


@NgModule({
  declarations: [
    DashboardComponent,
    LogInComponent,
    UserListComponent,
    RecipeListComponent,
    HomeComponent,
    ErrorComponent,
    RecipeDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
