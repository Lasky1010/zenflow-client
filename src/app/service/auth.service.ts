import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = 'http://localhost:8080/api/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


  public login(user:any):Observable<any>{
    return this.http.post(AUTH_API, {
        username:user.username,
        password:user.password}
    )
  }

  public signUp(user: any): Observable<any> {
    return this.http.post(AUTH_API+'/'+'sign-up',{
      username:user.username,
      email:user.email,
      password:user.password,
      confirmPassword:user.confirmPassword
    })
  }
}
