import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { HomeComponent } from '../home/home.component';
import { Product } from '../../../models/product';
import { MessengerService } from '../../services/messenger.service';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.css']
})
export class CamerasComponent implements OnInit {
  products: Product[];

  constructor(private homeService: HomeService, private messengerService: MessengerService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts():void {
    this.homeService.getProducts().subscribe(products => this.products = products.filter(prod => prod.cate_id == "3"));
  }
  addCameraToCart(camera) {
    if(this.products.find(prod => prod._id == camera._id).quantity == 0) {
      return;
    }
    this.messengerService.sendMessage(camera);
    this.products.find(prod => prod._id == camera._id).quantity--;
    this.homeService.updateProdQuantity(camera, camera.quantity).subscribe(() => {
      console.log("updated successfully! ");
    });
  }
}
