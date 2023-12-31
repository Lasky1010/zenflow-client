import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const IMAGE_API = 'http://localhost:8080/api/image';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  uploadImageToUser(file: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.set('file', file, 'file');
    return this.http.post(IMAGE_API, uploadData);
  }

  uploadImageToPost(file:File,id:number):Observable<any>{
    const uploadData=new FormData();
    uploadData.append('file',file)
    return this.http.post(IMAGE_API+'/'+id,file);
  }

  getProfileImage():Observable<any>{
    return this.http.get(IMAGE_API)
  }

  getProfileImageById(id: number): Observable<any> {
    return this.http.get(IMAGE_API + '/user/' + id)
  }

  getPostImage(id: number): Observable<any> {
    return this.http.get(IMAGE_API + '/post/' + id)
  }
}



