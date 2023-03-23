import {  Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.action';
import * as fromApp from '../store/app.reducer'

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

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

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addToShoppingList(ingredients: Ingredient[]) {
    debugger;
    // this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
