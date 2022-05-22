import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodProfileComponent } from './food-profile/food-profile.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path: '', redirectTo: '/search', pathMatch: 'full'},
  {path: 'search', component: SearchComponent},
  {path: 'food/:foodKey', component: FoodProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
