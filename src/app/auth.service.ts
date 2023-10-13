import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') != null) {
      this.saveUserData();

    }
  }

  userData = new BehaviorSubject(null);

  saveUserData() {
    let encodedUserData = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(encodedUserData));
    let userId = this.userData['_value'];
    console.log(userId)
  }




  logout() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['home'])
  }


  register(formData: object): Observable<any> {
    return this._HttpClient.post(`http://localhost:3000/api/v1/user/signup`, formData);
  }
  login(formData: object): Observable<any> {
    return this._HttpClient.post(`http://localhost:3000/api/v1/user/signin`, formData)
  }

  changePassword(formData: object, userId: any): Observable<any> {
    return this._HttpClient.patch(`http://localhost:3000/api/v1/user/changePassword/${userId}`, formData)
  }
  updateUser(formData: object, userId: any): Observable<any> {
    return this._HttpClient.put(`http://localhost:3000/api/v1/user/${userId}`, formData)
  }
}
