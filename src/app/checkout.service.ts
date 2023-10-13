import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private _HttpClient:HttpClient) { }

  checkout(formData: object): Observable<any> {
    return this._HttpClient.post(`http://localhost:3000/api/v1/order`, formData);
  }
  getOrders(): Observable<any> {
    return this._HttpClient.get(`http://localhost:3000/api/v1/order`);
  }

}
