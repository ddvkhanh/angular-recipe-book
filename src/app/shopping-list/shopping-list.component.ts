import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs-compat';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];

  private igChangeSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private dataService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.dataService.fetchShoppingList().subscribe();

    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        debugger;
        this.ingredients = ingredients;
      }
    );
    this.ingredients = this.shoppingListService.getIngredients();
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  onSave() {
    this.dataService.storeShoppingList(this.ingredients);
  }

  onReset() {
    if (confirm('Are you sure to remove all items in your Shopping List?')) {
      this.shoppingListService.resetShoppingList();
      this.dataService.storeShoppingList([]);
    }
  }
}
