import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductdetailsService {

  constructor(private _HttpClient:HttpClient) { }



 
  getProductDetails(id : string): Observable<any> {
    return this._HttpClient.get(`http://localhost:3000/api/v1/product/${id}`);
  }

  review(formData : object , id : string): Observable<any> {
    return this._HttpClient.post(`http://localhost:3000/api/v1/review/${id}`, formData);
  }

  getReviews(): Observable<any> {
    return this._HttpClient.get(`http://localhost:3000/api/v1/review`);
  }
}
