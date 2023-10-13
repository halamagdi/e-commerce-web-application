import { Component , OnInit} from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  id: string = '';
  searchKey: string = "";
  cartList: any[] = [];
  constructor(private _ProductService: ProductService, private _CartService: CartService, private _WishlistService: WishlistService) {

  }

  products: any[] = [];

  ngOnInit(): void {

    this._ProductService.getFeaturedProduct().subscribe((response) => {
      this.products = response.Products;
      console.log(this.products);
      this.products.forEach((e: any) => {
        Object.assign(e, { quantity: 1, total: e.price });
        // console.log(e) ;
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
