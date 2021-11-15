import { ErrorHandler } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FollowersService } from './services/followers.servce';
import { PostService } from './services/post.service';
import { NaviComponent } from './navi/navi.component';
import { UpperComponent } from './navi/upper/upper.component';
import { LowerComponent } from './navi/lower/lower.component';
import { DropDownComponent } from './navi/drop-down/drop-down.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './home/banner/banner.component';
import { ActionsHomeComponent } from './home/actions-home/actions-home.component';
import { GuaranteeSectionComponent } from './home/guarantee-section/guarantee-section.component';
import { CommonCategoryComponent } from './common-category/common-category.component';
import { MousePositionDirective } from './directives/mouse-position.directive';
import { MouseToLeftDirective } from './directives/mouse-to-left.directive';
import { RoundingNumbersPipe } from './pipes/rounding-numbers.pipe';
import { ItemComponentComponent } from './item-component/item-component.component';
import { ItemPhotoHeaderComponent } from './item-component/item-photo-header/item-photo-header/item-photo-header.component';
import { ItemOptionsComponent } from './item-component/item-options/options/options.component';
import { FeaturesComponent } from './item-component/features/features/features.component';
import { DescriptionComponent } from './item-component/description/description/description.component';
import { ItemActionsComponent } from './item-component/actions/item-actions/item-actions.component';
import { BestItemsComponent } from './home/bestItems/best-items/best-items.component';
import { SearchOptionsComponent } from './navi/upper/search-options/search-options/search-options.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { OpComponentComponent } from './common-options-and-itemsShow/op-component/op-component.component';
import { ItemShowComponent } from './common-options-and-itemsShow/item-show/item-show.component';
import { CommWrappOptComponent } from './common-options-and-itemsShow/op-component/comm-wrapp-opt/comm-wrapp-opt.component';
import { CommSliderComponent } from './common-options-and-itemsShow/op-component/comm-slider/comm-slider.component';
import { AllComponent } from './all/all.component';
import { NotFinishedComponent } from './not-finished/not-finished.component';
import { RouterModule } from '@angular/router';
import { LogInComponent } from './navi/upper/log-in/log-in.component';
import { LogInComponentComponent } from './log-in-component/log-in-component.component';
import { SingUpComponentComponent } from './sing-up-component/sing-up-component.component';
import { ShopingCartComponentComponent } from './shoping-cart-component/shoping-cart-component.component';
import { SingUpFormComponent } from './sing-up-component/sing-up-form/sing-up-form.component';
import { DescripionCompComponent } from './shoping-cart-component/descripion-comp/descripion-comp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppErrorHandler } from './commonErrors/use-class';
import { MenuIconComponent } from './navi/upper/menu-icon/menu-icon.component';
import { SmallerDropDownComponent } from './navi/smaller-drop-down/smaller-drop-down.component';
import { SubscribeComponent } from './home/subscribe/subscribe.component';
import { FolowComponent } from './home/folow/folow.component';
import { RouteParametersComponent } from './route-parameters/route-parameters.component';
import { AddToCartDirective } from './directives/add-to-cart.directive';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    UpperComponent,
    LowerComponent,
    DropDownComponent,
    HomeComponent,
    FooterComponent,
    BannerComponent,
    ActionsHomeComponent,
    GuaranteeSectionComponent,
    CommonCategoryComponent,
    MousePositionDirective,
    MouseToLeftDirective,
    RoundingNumbersPipe,
    ItemComponentComponent,
    ItemPhotoHeaderComponent,
    ItemOptionsComponent,
    FeaturesComponent,
    DescriptionComponent,
    ItemActionsComponent,
    BestItemsComponent,
    SearchOptionsComponent,
    SearchResultComponent,
    OpComponentComponent,
    ItemShowComponent,
    CommWrappOptComponent,
    CommSliderComponent,
    AllComponent,
    NotFinishedComponent,
    LogInComponent,
    LogInComponentComponent,
    SingUpComponentComponent,
    ShopingCartComponentComponent,
    SingUpFormComponent,
    DescripionCompComponent,
    MenuIconComponent,
    SmallerDropDownComponent,
    SubscribeComponent,
    FolowComponent,
    RouteParametersComponent,
    AddToCartDirective,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule

  ],
  providers: [
    PostService,
    FollowersService,
    { provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
