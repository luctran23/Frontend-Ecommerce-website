import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { HomeService } from '../../services/home.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit {
  products: Product[];

  constructor(private homeService: HomeService, private messengerService: MessengerService ) { }

  ngOnInit(): void {
   this.getProducts();
  }
  getProducts():void {
    this.homeService.getProducts().subscribe(products => this.products = products.filter(prod => prod.cate_id == "4"));
  }
  addAccessoryToCart(accessory) {
    if(this.products.find(prod => prod._id == accessory._id).quantity == 0) {
      return;
    }
    this.messengerService.sendMessage(accessory);
    this.products.find(prod => prod._id == accessory._id).quantity--;
    this.homeService.updateProdQuantity(accessory, accessory.quantity).subscribe(() => {
      console.log("updated successfully! ");
    });
  }
}
