import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5, 'piece'),
    new Ingredient('Orange', 10, 'piece'),
  ];

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
      let index = this.ingredients.findIndex(
        (i) => i.name.toLowerCase() === item.name.toLowerCase()
      );
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
}
