import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListResolverService implements Resolve<Ingredient[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private shoppingService: ShoppingListService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Ingredient[] | Observable<Ingredient[]> | Promise<Ingredient[]> {
    const ingredients = this.shoppingService.getIngredients();
    if (ingredients.length === 0) {
      return this.dataStorageService.fetchShoppingList();
    } else {
      ingredients;
    }
  }
}
