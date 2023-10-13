import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductdetailsService } from '../productdetails.service';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  id: string = '';
  productDetails: any = {};
  reviews: any = [];


  error: string = '';
  reviewForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.minLength(3)]),

  })
  constructor(private _ActivatedRoute: ActivatedRoute,
    private _ProductdetailsService: ProductdetailsService, public _CartService: CartService
    , public _ProductService: ProductService, private _WishlistService: WishlistService) {

  }
  product: any = [];

  ngOnInit(): void {


    this.id = this._ActivatedRoute.snapshot.params['id'];

    console.log(this.id)
    this._ProductdetailsService.getProductDetails(this.id).subscribe(res => {
      this.productDetails = res;
      console.log(res);

      // this.product = this.productDetails ; 
      //       this.product.forEach((e: any ) => {
      //         console.log(e) ;
      //         Object.assign(e, { quantity: 1, total: e["_values"] });
      //         console.log(e) ;
      //       })


    })

    this._ProductdetailsService.getReviews().subscribe(res => {
      this.reviews = res;
      // console.log(res);
    })


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


  addtoWishlist(product: any) {
    if (!this._WishlistService.productInWishlist(product)) {
      product.quantity = 1;
      this._WishlistService.addtowishlist(product);

    }

  }


  submitReviewForm(reviewForm: FormGroup) {

    if (reviewForm.valid) {
      this._ProductdetailsService.review(reviewForm.value, this.id).subscribe(
        (response) => {

          console.log(response)

        }, (err) => {
          this.error = err.error.message;
        })
    }
  }

}
