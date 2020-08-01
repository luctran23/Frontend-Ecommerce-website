import { Injectable } from '@angular/core';
import {  MessengerService } from '../services/messenger.service';
import { Product } from 'src/models/product';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')): [];
  
  constructor(private messengerService: MessengerService) { }
  
  getProdFromHomeComponent() {
    this.messengerService.getMessage().subscribe((product: Product) => {
      if(this.cartItems.find(item => item.prodId == product._id) == undefined){
        this.cartItems.push({ prodId: product._id, imgUrl: product.imgUrl, prodName: product.name, quantity: 1, price: product.price });
      }
      else {
        this.cartItems.find(item => item.prodId == product._id).quantity++;
      }
      
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    });
  }
 
}
