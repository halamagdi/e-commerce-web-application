import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutService } from '../checkout.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public products: any = [];
  public grandTotal !: number;
  error: string = '';

  checkoutForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    city: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    country: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    address: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
    phone: new FormControl(null, [Validators.required, Validators.minLength(11)]),

  })
  constructor(private _CheckoutService: CheckoutService, public _Router: Router, private _CartService: CartService) { }

  ngOnInit(): void {

    // this._CartService.getProducts().subscribe(res => {
    //   this.products = res;
    //   this.grandTotal = this._CartService.getTotalPrice();

    // })
    if (localStorage.getItem('cart_items') != null) {
      this.products = this._CartService.getProduct();
      console.log(this.products)

    }


  }

  get total() {
    return this.products?.reduce((sum: any, product: any) => ({
      quantity: 1,
      price: sum.price + product.quantity * product.price
    }),
      { quantity: 1, price: 0 }
    ).price
  }


  submitCheckoutForm(checkoutForm: FormGroup) {

    if (checkoutForm.valid) {
      this._CheckoutService.checkout(checkoutForm.value).subscribe(
        (response) => {
          console.log(response)
          if (response.message == "Done") {
            this._Router.navigate(['placeorder'])

          }

        }, (err) => {
          this.error = err.error.message;
        })
    }
  }



}
