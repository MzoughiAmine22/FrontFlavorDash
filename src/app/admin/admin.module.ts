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
import { MatDialogModule } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    DashboardComponent,
    LogInComponent,
    UserListComponent,
    RecipeListComponent,
    HomeComponent,
    ErrorComponent,
    RecipeDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
})
export class AdminModule {}
