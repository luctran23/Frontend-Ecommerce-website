import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SuccessfulComponent } from './components/successful/successful.component';
import { LaptopsComponent } from './components/laptops/laptops.component';
import { PhonesComponent } from './components/phones/phones.component';
import { CamerasComponent } from './components/cameras/cameras.component';
import { AccessoriesComponent } from './components/accessories/accessories.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'succesful', component: SuccessfulComponent },
  { path: 'laptops', component: LaptopsComponent },
  { path: 'phones', component: PhonesComponent },
  { path: 'cameras', component: CamerasComponent },
  { path: 'accessories', component: AccessoriesComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
