import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal !: any;
  public subTotal !: any;

  constructor(private _CartService: CartService) {
  }

  ngOnInit(): void {


    this.products = [...this._CartService.getProduct()];


  }


  removeItem(product: any) {
    this._CartService.removeProduct(product);

    this.products = this._CartService.getProduct();

  }

  get total() {
    return this.products?.reduce((sum: any, product: any) => ({
      quantity: 1,
      price: sum.price + product.quantity * product.price
    }),
      { quantity: 1, price: 0 }
    ).price
  }


}
