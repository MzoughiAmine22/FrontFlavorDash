import { Ingredient } from "./ingredient";
import { User } from "./user";

export class ShoppingList {
    constructor(
        public _id:string,
        public user:User,
        public ingredients:[{
            ingredient:Ingredient,
            quantity:number,
        }]
    )
    {}
}
