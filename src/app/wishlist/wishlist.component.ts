import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  public products: any = [];
  constructor(private _WishlistService: WishlistService, private _CartService: CartService) { }

  ngOnInit(): void {

    this.products = [...this._WishlistService.getProduct()];
  }

  // addtoCart(product: any) {
  //   this._CartService.addToCart(product);

  // }

  addtocart(product: any) {
    if (!this._CartService.productInCart(product)) {
      product.quantity = 1;
      this._CartService.addtoCart(product);

    }
  }


  removeItem(product: any) {
    this._WishlistService.removeProduct(product);

    this.products = this._WishlistService.getProduct();

  }




}
