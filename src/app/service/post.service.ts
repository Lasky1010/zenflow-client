import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const POST_API = 'http://localhost:8080/api/posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(post: any): Observable<any> {
    return this.http.post(POST_API,post);
  }

  getPostById(id: number): Observable<any> {
    return this.http.get(POST_API + '/' + id);
  }
  getAllPosts():Observable<any>{
    return this.http.get(POST_API);
  }

  getCurrentUserPosts():Observable<any> {
    return this.http.get(POST_API+'/user')
  }

  getPostsForUserId(id: number): Observable<any> {
    return this.http.get(POST_API + '/' + id);
  }


  deletePost(id:number) {
    return this.http.delete(POST_API+'/'+id);
  }

  likePost(id:number,username:string):Observable<any>{
    return this.http.post(POST_API+'/'+id+'/'+username,null);
  }
}
