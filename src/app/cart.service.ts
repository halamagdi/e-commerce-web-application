import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  constructor(private _HttpClient: HttpClient) {

    if (localStorage.getItem('cart_items') != null) {
      this.loadCart();

    }

  }


  addtoCart(product: any) {
    // this._CartService.addToCart(product);
    this.cartItemList.push(product);
    this.saveCart();
    // this.getTotalPrice() ; 
  }

  loadCart(){
    this.cartItemList = JSON.parse(localStorage.getItem('cart_items') as any) || []
  }

  productInCart(product :any){
    return this.cartItemList.findIndex((a:any)=>
      a._id === product._id
    ) > -1 ;
  }

  removeProduct(product:any){
    const index = this.cartItemList.findIndex((a:any)=>  a._id === product._id
    ) ;

    if(index > -1){
      this.cartItemList.splice(index , 1);
      this.saveCart() ;
    }

  }

  
  saveCart() {
    localStorage.setItem('cart_items', JSON.stringify(this.cartItemList))
  }

  getProduct(){
    return this.cartItemList ; 
  }


  // getProducts() {
  //   return this.productList.asObservable();
  // }

  // setProduct(product: any) {
  //   this.cartItemList.push(...product);
  //   this.productList.next(product);  
  // }

  // addToCart(product: any) {
  //   this.cartItemList.push(product);
  //   this.productList.next(this.cartItemList);
  //   this.getTotalPrice();
  //   console.log(this.cartItemList)
  // }

  // getTotalPrice(): number {
  //   let grandTotal = 0;
  //   this.cartItemList.map((a : any) => {
  //     grandTotal += a.total;

  //   })
  //   return grandTotal;
  // }
  

  // removeCartItem(product: any) {
  //   this.cartItemList.map((a: any, index: any) => {
  //     if (product.id === a.id) {
  //       this.cartItemList.splice(index, 1);
  //     }

  //   })
  //   this.productList.next(this.cartItemList);
  // }

}
