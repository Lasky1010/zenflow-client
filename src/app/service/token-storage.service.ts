import {Injectable} from '@angular/core';

const TOKEN_KEY: string = 'auth-token';
const USER_KEY: string = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {


  public saveToken(token: string):void {

    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);

  }

  public getToken(): string {
    // @ts-ignore
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any):void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));

  }

  public getUser():any{
    // @ts-ignore
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  logOut():void{
    window.sessionStorage.clear();
    window.location.assign('localhost:4200/login');
}

}
