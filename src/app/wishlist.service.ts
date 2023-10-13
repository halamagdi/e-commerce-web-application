import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  public wishList: any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor(private _HttpClient: HttpClient) { 
    if (localStorage.getItem('wishlist_item') != null) {
      this.loadwishlist();

    }

  }

  addtowishlist(product: any) {
    // this._CartService.addToCart(product);
    this.wishList.push(product);
    this.savewishlist();
    // this.getTotalPrice() ; 
  }

  loadwishlist() {
    this.wishList = JSON.parse(localStorage.getItem('wishlist_item') as any) || []
  }

  productInWishlist(product: any) {
    return this.wishList.findIndex((a: any) =>
      a._id === product._id
    ) > -1;
  }

  removeProduct(product: any) {
    const index = this.wishList.findIndex((a: any) => a._id === product._id
    );

    if (index > -1) {
      this.wishList.splice(index, 1);
      this.savewishlist();
    }

  }


  savewishlist() {
    localStorage.setItem('wishlist_item', JSON.stringify(this.wishList))
  }

  getProduct() {
    return this.wishList;
  }




}
