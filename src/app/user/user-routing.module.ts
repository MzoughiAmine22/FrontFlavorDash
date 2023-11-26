import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LandingComponent } from './Components/landing/landing.component';
import { ErrorComponent } from './Components/error/error.component';
import { AboutComponent } from './Components/about/about.component';
import { CookListComponent } from './Components/cook-list/cook-list.component';
import { RecipesComponent } from './Components/recipes/recipes.component';
import { ShoppingListComponent } from './Components/shopping-list/shopping-list.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { RecipeDetailsComponent } from './Components/recipe-details/recipe-details.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'landing', component: LandingComponent },
      { path: 'about', component: AboutComponent },
      { path: 'cooklist', component: CookListComponent },
      { path: 'recipes', component: RecipesComponent },
      {
        path: 'recipe/:id', 
        component: RecipeDetailsComponent,
      },
      { path: 'shoppinglist', component: ShoppingListComponent },
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: '**', component: ErrorComponent },
    ],
  },
  { path: 'login', component: LogInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
