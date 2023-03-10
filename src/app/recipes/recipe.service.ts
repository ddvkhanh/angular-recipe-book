import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor (private shoppingListService: ShoppingListService) {}

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Bun Bo Hue',
  //     'Spicy beef noodle soup with the aroma you cannot resist',
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSkn06xHEPZo3L-0CUCw1Rsmi560Dg73Swg&usqp=CAU',
  //     [
  //       new Ingredient('Beef', 5),
  //       new Ingredient('Noodle', 1),
  //     ]
  //   ),
  //   new Recipe(
  //     'Com tam',
  //     'You wish you could eat this everyday',
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSkn06xHEPZo3L-0CUCw1Rsmi560Dg73Swg&usqp=CAU',
  //     [
  //       new Ingredient('Pork chop', 2),
  //       new Ingredient('Rice', 1),
  //     ]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number) {
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  
}
