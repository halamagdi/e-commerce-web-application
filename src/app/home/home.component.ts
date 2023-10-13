import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchKey: string = "";

  constructor(private _ProductService: ProductService, private _CartService: CartService, private _WishlistService: WishlistService) { }

  featuredProducts: any[] = [];
  newArrival: any = [];


  ngOnInit(): void {

    this._ProductService.getFeaturedProduct().subscribe((response) => {
      this.featuredProducts = response.Products.slice(0, 8);
      console.log(this.featuredProducts);

      this.featuredProducts.forEach((e: any) => {
        Object.assign(e, { quantity: 1, total: e.price });
      })


    })
    this._ProductService.getFeaturedProduct().subscribe((response) => {
      this.newArrival = response.Products.slice(20, 28);
      console.log(this.newArrival);

      this.newArrival.forEach((e: any) => {
        Object.assign(e, { quantity: 1, total: e.price });
      })
    })
    this._ProductService.search.subscribe((val: any) => {
      this.searchKey = val
    })

  }



  addtocart(product: any) {
    if (!this._CartService.productInCart(product)) {
      product.quantity = 1;
      this._CartService.addtoCart(product);

    }
  }


  addtoWishlist(product: any) {
    if (!this._WishlistService.productInWishlist(product)) {
      product.quantity = 1;
      this._WishlistService.addtowishlist(product);

    }

  }


}
