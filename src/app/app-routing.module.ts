import { NotFinishedComponent } from './not-finished/not-finished.component';
import { CommonCategoryComponent } from './common-category/common-category.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponentComponent } from './item-component/item-component.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { AllComponent } from './all/all.component';
import { LogInComponentComponent } from './log-in-component/log-in-component.component';
import { SingUpComponentComponent } from './sing-up-component/sing-up-component.component';
import { ShopingCartComponentComponent } from './shoping-cart-component/shoping-cart-component.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  {path:"home", redirectTo:""},
  {path:"categories/:cat_name", component:CommonCategoryComponent},
  {path:"categories/:cat_name", component:CommonCategoryComponent},
  {path:"categories/:cat_name", component:CommonCategoryComponent},
  {path:"categories/:cat_name", component:CommonCategoryComponent},
  {path:"categories/:cat_name", component:CommonCategoryComponent},
  { path: "categories/:cat_name/:prod_slug/:id", component: ItemComponentComponent },
  { path: "result", component: SearchResultComponent },
  { path: "allProducts", component: AllComponent },
  { path: "notFinished", component: NotFinishedComponent },
  { path: "log-in", component: LogInComponentComponent },
  { path: "sing-up", component: SingUpComponentComponent },
  { path: "shoping-cart", component: ShopingCartComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
