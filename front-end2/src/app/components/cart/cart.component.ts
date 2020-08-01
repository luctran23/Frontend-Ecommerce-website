import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { HomeService } from 'src/app/services/home.service';
import { MessengerService } from '../../services/messenger.service';
import { NgAnalyzeModulesHost } from '@angular/compiler';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any;
  singleProdQuantity: any;
  allProducts: any;
  product: any;

  constructor(public cartService: CartService, private homeService: HomeService, private messengerService: MessengerService) { }

  ngOnInit(): void {
    this.products = this.cartService.cartItems;
   this.getSingleProdQty();
   this.homeService.getProducts().subscribe(products => this.allProducts = products);
  }
  TotalMoney(carts: any[]) {
    return carts.reduce((total, item) => total + item.quantity * item.price, 0);
  }
  increaseQuantity(productId) {
    if(this.singleProdQuantity > 0) {
      this.products.find(item => item.prodId == productId).quantity++;
    }
    
  }
  decreaseQuantity(producId) {
    if(this.products.find(item => item.prodId == producId).quantity > 1) {
      this.products.find(item => item.prodId == producId).quantity--;
    }
  }
  deleteCartItem(cartCollection: any, product: any) {
    alert('Xóa sản phẩm khỏi giỏ hàng');
    this.products = cartCollection.filter(item => item.prodId !== product.prodId);
    localStorage.setItem('cart', JSON.stringify(this.products));
    location.reload();
    
    this.product = this.allProducts.find(item => item._id == product.prodId);
    this.homeService.updateProdQuantity(this.product, this.product.quantity + product.quantity).subscribe(() => {
      console.log("Update after delete cart");
    });
  }
  getSingleProdQty() {
    this.messengerService.currentProductQuantity.subscribe(quantity => {
      console.log(quantity);
    });
  }
}
