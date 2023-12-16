import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from "./app.component";
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {NavigationComponent} from './layout/navigation/navigation.component';
import {authInterceptorProviders} from "./service/auth-interceptor.service";
import {authErrorInterceptorProviders} from "./service/error-interceptor.service";
import {IndexComponent} from './layout/index/index.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {EditComponent} from './user/edit/edit.component';
import {ProfileComponent} from './layout/profile/profile.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {PostDialogComponent} from './post/postdialog/post-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavigationComponent,
    IndexComponent,
    EditComponent,
    ProfileComponent,
    PostDialogComponent
  ],
  imports: [
    MatGridListModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatAutocompleteModule,
    MatGridListModule
  ],

  providers: [authInterceptorProviders,authErrorInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
