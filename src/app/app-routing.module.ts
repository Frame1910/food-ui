import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodProfileComponent } from './food-profile/food-profile.component';

const routes: Routes = [
  {path: 'food/:foodKey', component: FoodProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
