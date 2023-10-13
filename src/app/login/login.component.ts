import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(`^[A-Z][a-z][1-9]{3,6}$`)]),

  })
  constructor(public _AuthService: AuthService, public _Router: Router) { }
  userData = new BehaviorSubject(null);


  ngOnInit(): void {

  }
  submitLoginForm(loginForm: FormGroup) {

    if (loginForm.valid) {
      this._AuthService.login(loginForm.value).subscribe(
        (response) => {

          if (response.message == "Login Success") {

            localStorage.setItem('userToken', response.token)
            console.log(response.token);
            let encodedUserData = JSON.stringify(localStorage.getItem('userToken'));
            this.userData.next(jwtDecode(encodedUserData));
            let userId = this.userData['_value'].userId;
            // console.log(userId)
            this._AuthService.saveUserData();
            this._Router.navigate(['userprofile', userId])

          }

        }, (err) => {
          this.error = err.error.message;
        })
    }
  }

}
