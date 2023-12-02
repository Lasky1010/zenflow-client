import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<any> {
    return this.http.get(USER_API+'/' + id);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(USER_API);
  }
  getCurrentUsername(): Observable<any> {
    return this.http.get(USER_API+'/name');
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(USER_API + '/update', user);
  }
}

const USER_API = 'http://localhost:8080/api/user';
