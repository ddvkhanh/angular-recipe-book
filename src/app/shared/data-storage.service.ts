import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  api: string = 'https://angular-recipe-31e2b-default-rtdb.firebaseio.com';
  private ingredients: Ingredient[] = [];
  private recipes: Recipe[] = [];

  constructor(private http: HttpClient) {}

  //Recipe
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
  }

  storeRecipes() {
    const recipes = this.getRecipes();
    this.http.put(this.api + '/recipes.json', recipes).subscribe((response) => {
      console.log(response);
    });
  }

  storeRecipe(recipe: Recipe) {
    this.http.post(this.api + '/recipes.json', recipe).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.api + '/recipes.json').pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredient: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.setRecipes(recipes);
      })
    );
  }

  deleteRecipe(index: number) {
    this.http
      .delete(this.api + '/recipes/' + index + '.json')
      .subscribe((response) => {
        console.log(response);
      });
  }

  //Shopping List
  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  setShoppingList(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
  }

  storeShoppingList(shoppingList: Ingredient[]) {
    this.http
      .put(this.api + '/shopping-list.json', shoppingList)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchShoppingList() {
    return this.http.get<Ingredient[]>(this.api + '/shopping-list.json').pipe(
      map((shoppingList) => (shoppingList ? shoppingList : [])),
      tap((ingredients) => {
        this.setShoppingList(ingredients);
      })
    );
  }
}
