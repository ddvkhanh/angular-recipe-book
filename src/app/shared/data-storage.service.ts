import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

  api: string = 'https://angular-recipe-31e2b-default-rtdb.firebaseio.com';

  storeRecipe(recipes: Recipe[]) {
    this.http.put(this.api + '/recipes.json', recipes).subscribe((response) => {
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

  storeShoppingList(shoppingList: Ingredient[]) {
    this.http
      .put(this.api + '/shopping-list.json', shoppingList)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchShoppingList() {
    return this.http
      .get<Ingredient[]>(this.api + '/shopping-list.json')
      .pipe(map((shoppingList) => (shoppingList ? shoppingList : [])));
  }
}
