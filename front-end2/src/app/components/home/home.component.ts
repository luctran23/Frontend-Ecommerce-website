import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { HomeService } from '../../services/home.service';
import { Router } from '@angular/router';
import { ServerResponse } from '../../../models/serverResponse';
import { MessengerService } from '../../services/messenger.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[];
  serverResponse: ServerResponse;
  products2: Product[];
  alert: string = "";
  constructor(
    private homeService: HomeService,
    private router: Router,
    private messengerService: MessengerService,
    public cartService: CartService
    ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getKeyWord();
  }


  getProducts():void {
    this.homeService.getProducts().subscribe((products) =>{
      this.products = products;
      this.products2 = products;
    });
  }

  selectedProd(id: string) {
    this.router.navigate(['/product/', id]).then();
  }

  addToCart(product: Product) {
    if(this.products.find(prod => prod._id == product._id).quantity == 0) {
      return;
    }
    this.messengerService.sendMessage(product);
    this.products.find(prod => prod._id == product._id).quantity--;
    
    this.homeService.updateProdQuantity(product, product.quantity).subscribe(() => {
      console.log("updated successfully! ");
    });
    this.messengerService.changeCurrentProductQuantity(product.quantity);
  }

 // SEARCH FEATURE HOME PAGE
  getKeyWord() {
    this.messengerService.currentMessage.subscribe(message => {
        if(this.products == undefined) {
          console.log('that\'s right, products item is undefined right now');
        }
        else {
          console.log('no it\'s not undefined!');
          this.products = this.products2.filter(item => item.name.toLowerCase().includes(message.toLowerCase()));
          console.log(message);
          if(this.products.length == 0) {
            this.alert = `Không tìm thấy kết quả nào cho ${message}`;
          }
        }
    });
  }
  
}
