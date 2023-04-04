import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new BehaviorSubject<Ingredient[]>([]);
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [];

  ingredientAdded = new EventEmitter<{ name: string; amount: number }>();

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    let index = this.ingredients.findIndex(
      (i) => i.name.toLowerCase() === ingredient.name.toLowerCase()
    );
    if (index >= 0) {
      this.ingredients[index].amount += ingredient.amount;
    } else {
      this.ingredients.push(ingredient);
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    for (let item of ingredients) {
      let index =
        this.ingredients.length > 0
          ? this.ingredients.findIndex(
              (i) => i.name.toLowerCase() === item.name.toLowerCase()
            )
          : -1;
      if (index >= 0) {
        this.ingredients[index].amount += item.amount;
      } else {
        this.ingredients.push(item);
      }
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  resetShoppingList() {
    this.ingredients = [];
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  // saveShoppingList() {
  //   console.log(this.ingredients);
  //   this.dataService.storeShoppingList(this.ingredients);
  // }

  setShoppingList(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
  }

  // resetShoppingList() {
  //   debugger;
  //   if (confirm('Are you sure to remove all items in your Shopping List?')) {
  //     this.ingredients = [];
  //     this.dataService.storeShoppingList(this.ingredients);
  //     this.ingredientsChanged.next(this.ingredients.slice());
  //   }
  // }
}
