import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component , OnInit} from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutService } from '../checkout.service';

ActivatedRoute
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit{
  id: string = '';
  orders: any = [];
  error: string = '';


  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.pattern(`^[A-Z][a-z][1-9]{3,6}$`)]),

  })

  updateUserForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),

  })


  constructor(private _AuthService: AuthService, private _ActivatedRoute: ActivatedRoute, public _Router: Router
    , private _CheckoutService: CheckoutService) {

  }
  userData = new BehaviorSubject(null);

  ngOnInit(): void {
    const tabs = document.querySelectorAll("[data-target]")
    const tabContents = document.querySelectorAll("[content]");
    tabs.forEach((tab: any) => {
      tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.target);
        tabContents.forEach((tabContents) => {
          tabContents.classList.remove("active-tab");
        });


        target.classList.add("active-tab");

        tabs.forEach((tab) => {
          tab.classList.remove("active-tab");
        });

        tab.classList.add("active-tab");
      });
    });

    // get orders 

    this._CheckoutService.getOrders().subscribe((response) => {
      this.orders = response;
    })

    



  }


  submitchangeForm(changePasswordForm: FormGroup) {


    this.id = this._ActivatedRoute.snapshot.params['id'];


    if (changePasswordForm.valid) {
      this._AuthService.changePassword(changePasswordForm.value, this.id).subscribe(
        (response) => {

          if (response.message == "password changed successfuly") {

            console.log(response);

          }

        }, (err) => {
          this.error = err.error.message;
        })
    }
  }


  submitupdateUserForm(updateUserForm: FormGroup) {


    this.id = this._ActivatedRoute.snapshot.params['id'];


    if (updateUserForm.valid) {
      this._AuthService.updateUser(updateUserForm.value, this.id).subscribe(
        (response) => {

          if (response.message == "Name changed successfuly") {

            console.log(response);

          }

        }, (err) => {
          this.error = err.error.message;
        })
    }
  }

  logout() {
    this._AuthService.logout();
  }

}
