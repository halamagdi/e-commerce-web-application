import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import jwtDecode from 'jwt-decode';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false;
  public totatItem: number = 0;
  public searchTerm: string = '';
  cartlist: any[] = []
  constructor(private _AuthService: AuthService, private _CartService: CartService, private _ProductService: ProductService
    , private _ActivatedRoute: ActivatedRoute, private _Router: Router) { }

  brands: any = [];
  skinCare: any[] = [];
  HairCare: any[] = [];
  wellness: any[] = [];
  productByBrand: any = [];
  id: string = '';
  products: any[] = [];

  // product: any = [];
  // searchResults: any = [];
  // query : string | null |any = '' ;
  // // searchTerm: string = '';

  userData = new BehaviorSubject(null);
  userId: any = ''



  ngOnInit(): void {

    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.isLogin = true;
      }
      else {
        this.isLogin = false;
      }
    })

    // this.cartlist = [...this._CartService.getProduct()];


    this._ProductService.getBrand().subscribe((res) => {
      this.brands = res;
      console.log("brands", this.brands);
    })

    this._ProductService.getSubCategory().subscribe((res) => {
      this.skinCare = res.slice(0, 2);
      // console.log(this.skinCare);
    })

    this._ProductService.getSubCategory().subscribe((res) => {
      this.HairCare = res.slice(2, 4);
      // console.log(this.HairCare);
    })

    this._ProductService.getSubCategory().subscribe((res) => {
      this.wellness = res.slice(4, 5);
      // console.log(this.wellness);
    })

    let encodedUserData = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(encodedUserData));
    this.userId = this.userData['_value'].userId;
    console.log(this.userId);


  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this._ProductService.search.next(this.searchTerm);

  }


  logout() {
    this._AuthService.logout();
  }

}
