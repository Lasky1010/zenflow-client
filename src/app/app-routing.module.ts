import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {IndexComponent} from "./layout/index/index.component";
import {AuthGuardService} from "./service/auth-guard.service";
import {ProfileComponent} from "./layout/profile/profile.component";
import {AddPostComponent} from "./user/add-post/add-post.component";

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path: '', component: IndexComponent, canActivate: [AuthGuardService]},
  {path: 'profile/:userId', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'create-post', component: AddPostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
