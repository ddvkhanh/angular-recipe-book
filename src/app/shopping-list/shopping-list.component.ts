import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs-compat';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];

  private igChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListService.fetchIngredients().subscribe((data) => {
      this.ingredients = data;
      this.shoppingListService.setShoppingList(this.ingredients);
    });

    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
    this.ingredients = this.shoppingListService.getIngredients();
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.ingredients[index].isChecked = !this.ingredients[index].isChecked;
    this.shoppingListService.startedEditing.next(index);
  }

  onSave() {
    this.shoppingListService.saveShoppingList();
  }

  onReset() {
    if (confirm('Are you sure to remove all items in your Shopping List?')) {
      this.shoppingListService.resetShoppingList();
    }
  }
}
