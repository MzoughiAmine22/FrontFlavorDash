import { Recipe } from "./recipe";
import { User } from "./user";

export class CookList {

    constructor(
        public _id:string,
        public user:User,
        public recipes:Recipe[]
    )
    {}
}
