import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error: string = '';
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(`^[A-Z][a-z][1-9]{3,6}$`)]),

  })
  constructor(public _AuthService: AuthService, public _Router: Router) { }

  ngOnInit(): void {

    
  }


  submitRegisterForm(registerForm: FormGroup) {

    if (registerForm.valid) {
      this._AuthService.register(registerForm.value).subscribe(
        (response) => {

        if (response.message == "Account Activation Successfully") {
          this._Router.navigate(['login'])

        }

      }, (err) => {
        this.error = err.error.message;
      })
    }
  }


}
