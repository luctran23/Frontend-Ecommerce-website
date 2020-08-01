import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../../services/messenger.service';
import { Product } from '../../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  cartItems: any;

  indexOnCart: number = 0;
  total: number;

  constructor(private messengerService: MessengerService,
              public cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;
    this.cartService.getProdFromHomeComponent();
  }
  
  TotalMoney(carts: any[]) {
    return carts.reduce((total, item) => total + item.quantity * item.price, 0);
  }
  totalQuantity(carts: any[]) {
    return carts.reduce((total, item) => total + item.quantity, 0);
  }
  deleteProductFromCart(carts: any, prod: any) {
    alert('Xóa sản phẩm này khỏi giỏ? ');
    carts = carts.filter(item => item.prodId !== prod.prodId);
    this.cartItems = carts;
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
  // WHENEVER CLICK sendKeyWord() is invoked
  sendKeyWord(item) {
    this.messengerService.changeBehaviorMessage(item);
  }
  
}
