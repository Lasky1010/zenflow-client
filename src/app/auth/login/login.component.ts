import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {TokenStorageService} from '../../service/token-storage.service';
import {Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
// @ts-ignore
  public loginForm: FormGroup;
  hide = true;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar) {
    if (this.tokenStorage.getUser()) {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  submit(): void {
    this.authService.login({
      // @ts-ignore
      username: this.loginForm.value.username,
      // @ts-ignore
      password: this.loginForm.value.password
    })
      .subscribe(data => {
          console.log(data);
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);
          this.router.navigate(['']);
          window.location.reload();
        },
        error => {
          console.log(error);
          this.snackbar.open(error, undefined, {
            duration: 2000
          })

        });
  }

}
