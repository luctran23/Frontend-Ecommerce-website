import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { SuccessfulComponent } from './components/successful/successful.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule }    from '@angular/common/http';
import { LaptopsComponent } from './components/laptops/laptops.component';
import { PhonesComponent } from './components/phones/phones.component';
import { CamerasComponent } from './components/cameras/cameras.component';
import { AccessoriesComponent } from './components/accessories/accessories.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    HomeComponent,
    ProductComponent,
    SuccessfulComponent,
    CheckoutComponent,
    LaptopsComponent,
    PhonesComponent,
    CamerasComponent,
    AccessoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
