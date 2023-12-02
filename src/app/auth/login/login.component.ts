import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {TokenStorageService} from '../../service/token-storage.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../service/notification.service';

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
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder) {
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
          this.notificationService.showMessage('Successfully logged in');
          this.router.navigate(['']);
          window.location.reload();
        },
        (error: { message: string; }) => {
          console.log(error);
          this.notificationService.showMessage(error.message);
        });
  }

}
