import { Component } from '@angular/core';
import { CookListService } from '../../Services/cook-list.service';
import { UserService } from '../../Services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cook-list',
  templateUrl: './cook-list.component.html',
  styleUrl: './cook-list.component.scss',
})
export class CookListComponent {

  message:string="";
  notLoggedIn:boolean=false;
  constructor(
    private cookListService: CookListService,
    private userService: UserService
  ) {}
  recipes: any;
  deleteRecipeFromCook(recId: string) {
    this.userService.getUserCookie().subscribe((data: any) => {
      this.notLoggedIn=false;
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
    },(err:HttpErrorResponse)=>{
      console.log(err);
      console.log("salut");
      
      this.message="You must be logged in to access your cooklist";
      this.notLoggedIn=true;
    });
  }
}
