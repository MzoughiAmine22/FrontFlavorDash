import { Component } from '@angular/core';
import { CookListService } from '../../Services/cook-list.service';
import { UserService } from '../../Services/user.service';
import { ShoppingListService } from '../../Services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
})
export class ShoppingListComponent {
  constructor(
    private shoppingService: ShoppingListService,
    private userService: UserService
  ) {}
  ingredients: any;
  deleteIngredient(idIngre: string) {
    this.userService.getUserCookie().subscribe((data: any) => {
      this.shoppingService
        .deleteIngredientFromShoppingList(data.token, idIngre)
        .subscribe((data: any) => {
          this.ingredients = this.ingredients.filter((ingredient: any) => {
            return ingredient.ingredient._id !== idIngre;
          });
        });
    });
  }
  username: string | undefined;
  ngOnInit(): void {
    this.userService.getUserCookie().subscribe((data: any) => {
      this.username = data.user.name;
      console.log(this.username);
      console.log(data.token);
      this.shoppingService
        .getShoppingListByUser(data.token)
        .subscribe((data: any) => {
          this.ingredients = data.ingredients;
          console.log(this.ingredients);
        });
    });
  }
}
