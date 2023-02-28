import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService
  ) {}

  api: string = 'https://angular-recipe-31e2b-default-rtdb.firebaseio.com'


  storeRecipe() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        this.api + '/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      }); debugger;
    this.storeShoppingList();
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        this.api + '/recipes.json',
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredient: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

  storeShoppingList() {
    const shoppingList = this.shoppingListService.getIngredients();
    this.http
      .put(
        this.api + '/shopping-list.json',
        shoppingList
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
