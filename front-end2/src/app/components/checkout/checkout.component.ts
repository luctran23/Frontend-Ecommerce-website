import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { User } from '../../../models/user';
import { CheckoutService } from '../../services/checkout.service';
import { Bill } from '../../../models/bill';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products: any;
  newUser: User = {
    _id: "",
    name: "",
    email: "",
    address: "",
    phone: ""
  };
  userId = "";
  newBill: Bill = {
    _id: "",
    date: Date.now().toString(),
    user_id: "1"
  }
  newBillDetail = {
    _id: "",
    bill_id: "",
    product_id: "",
    quantity: 0,
    price: 0
  }
  constructor(public cartService: CartService, private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.products = this.cartService.cartItems;
  }
  TotalMoney(checkouts: any[]) {
    return checkouts.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  Order(name , email, address, phone) {
    this.newUser.name = name;
    this.newUser.email = email;
    this.newUser.address = address;
    this.newUser.phone = phone;
    this.checkoutService.postUser(this.newUser).subscribe((user) => {
      this.newBill.user_id = user._id;
      this.checkoutService.postBill(this.newBill).subscribe((bill) => {
        this.newBillDetail.bill_id = bill._id;
        for(var i = 0; i < this.products.length; i++) {
          this.newBillDetail.product_id = this.products[i].prodId;
          this.newBillDetail.quantity = this.products[i].quantity;
          this.newBillDetail.price = this.products[i].price;
          this.checkoutService.postBillDetail(this.newBillDetail).subscribe((billDetail) => {
            console.log(`bill details ${i} ${billDetail._id}`);
          });
        }
      });
    });
  }

}
