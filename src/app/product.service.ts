import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public search = new BehaviorSubject<string>('');

  constructor(private _HttpClient: HttpClient) { }

  getFeaturedProduct(): Observable<any> {
    return this._HttpClient.get(`http://localhost:3000/api/v1/product`);
  }

  getBrand(): Observable<any> {
    return this._HttpClient.get(`http://localhost:3000/api/v1/brands`);
  }

  getSubCategory(): Observable<any> {
    return this._HttpClient.get(`http://localhost:3000/api/v1/subCategories`);
  }

  

}
