import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs-compat';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { DataStorageService } from '../shared/data-storage.service';

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
    this.dataService.fetchShoppingList().subscribe((ingredients) => {
      this.ingredients = ingredients;
      this.shoppingListService.setShoppingList(ingredients);
    });

    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        debugger;
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  onSave() {
    this.shoppingListService.saveShoppingList();
  }

  onReset() {
    this.shoppingListService.setShoppingList([]);
    this.shoppingListService.resetShoppingList();
  }
}
