import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListResolverService } from './shopping-list.resolver.service';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShoppingListComponent,
        resolve: [ShoppingListResolverService],
      },
    ]),
    FormsModule,
  ],
})
export class ShoppingListModule {}
