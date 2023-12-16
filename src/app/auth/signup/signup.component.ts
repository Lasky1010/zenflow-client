import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';

import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // @ts-ignore
  public signupForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.signupForm = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: ['', Validators.compose([Validators.required])],
    });
  }

  submit(): void {
    console.log(this.signupForm.value);

    this.authService.signUp({
      email: this.signupForm.value.email,
      username: this.signupForm.value.username,
      name: this.signupForm.value.name,
      password: this.signupForm.value.password,
      confirmPassword: this.signupForm.value.confirmPassword,
    }).subscribe(data => {
      console.log(data);
      this.snackbar.open('Successfully Registered', undefined, {
        duration: 2000
      });
      this.router.navigate(['login']);
    }, error => {
      this.snackbar.open('Something went wrong during registration', undefined, {
        duration: 2000
      });
    });
  }

}
