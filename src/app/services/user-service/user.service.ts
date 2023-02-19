import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';

export interface Roles {
  name:String
  }
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url : string ='http://localhost:8080/api/users/roles';
  private urladd : string ='http://localhost:8080/api/users/add';

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService
  ) {}
  


  getRoles(): Observable<any[]>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
        })
  
        const httpOptions = {
          headers: headers_object
        };
        
      return this.http.get<any[]>(this.url,httpOptions)
    }else{
      return this.http.get<any[]>(this.url)
    }

  }

  addUsers(formData: any): Observable<any>{
    let obj = this.localStorageServc.getStorageItems()
    const body=JSON.stringify(formData);
    console.log(body)
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
      })

      const httpOptions = {
        headers: headers_object
      };
      
      return this.http.post(this.urladd, body,httpOptions)
    }else{
      return this.http.post(this.urladd, body)
    }
  }
}
