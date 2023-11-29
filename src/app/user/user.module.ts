import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { RecipesComponent } from './Components/recipes/recipes.component';
import { RecipeDetailsComponent } from './Components/recipe-details/recipe-details.component';
import { ShoppingListComponent } from './Components/shopping-list/shopping-list.component';
import { CookListComponent } from './Components/cook-list/cook-list.component';
import { IngredientComponent } from './Components/ingredient/ingredient.component';
import { LandingComponent } from './Components/landing/landing.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { AboutComponent } from './Components/about/about.component';
import { ErrorComponent } from './Components/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RecipesComponent,
    RecipeDetailsComponent,
    ShoppingListComponent,
    CookListComponent,
    IngredientComponent,
    LandingComponent,
    LogInComponent,
    SignUpComponent,
    AboutComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatSnackBarModule
  ]
})
export class UserModule { }
