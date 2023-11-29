import { Component } from '@angular/core';
import { CookListService } from '../../Services/cook-list.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-cook-list',
  templateUrl: './cook-list.component.html',
  styleUrl: './cook-list.component.scss',
})
export class CookListComponent {
  constructor(
    private cookListService: CookListService,
    private userService: UserService
  ) {}
  recipes: any;
  deleteRecipeFromCook(recId: string) {
    this.userService.getUserCookie().subscribe((data: any) => {
      this.cookListService
        .deleteRecipeFromCooklist(recId, data.token)
        .subscribe((data: any) => {
          this.recipes = this.recipes.filter((recipe: any) => {
            return recipe._id !== recId;
          });
        });
    });
  }
  ngOnInit(): void {
    this.userService.getUserCookie().subscribe((data: any) => {
      this.cookListService
        .getUserCooklist(data.token)
        .subscribe((data: any) => {
          console.log(data);
          this.recipes = data.recipes;
        });
    });
  }
}
