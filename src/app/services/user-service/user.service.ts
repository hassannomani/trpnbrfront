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
  private url_list : string ='http://localhost:8080/api/users/all';
  private url_single : string ='http://localhost:8080/api/users/user/';
  private url_pending_all : string ='http://localhost:8080/api/users/pending-all';
  private url_approve_representative : string ='http://localhost:8080/api/users/approve/';

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

  getAllUSers(): Observable<any[]>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
        })
  
        const httpOptions = {
          headers: headers_object
        };
        
      return this.http.get<any[]>(this.url_list,httpOptions)
    }else{
      return this.http.get<any[]>(this.url)
    }

  }

  getAllPendingUsers(): Observable<any[]>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
        })
  
        const httpOptions = {
          headers: headers_object
        };
        
      return this.http.get<any[]>(this.url_pending_all,httpOptions)
    }else{
      return this.http.get<any[]>(this.url_pending_all)
    }

  }

  getAUser(username: String): Observable<any>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
        })
  
        const httpOptions = {
          headers: headers_object
        };
        
      return this.http.get<any>(this.url_single+username,httpOptions)
    }else{
      return this.http.get<any>(this.url_single+username)
    }

  }

  approvePendingUser(uuid:string): Observable<any>{
    let obj = this.localStorageServc.getStorageItems()
   
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
        })
  
        const httpOptions = {
          headers: headers_object
        };
        
      return this.http.get<any>(this.url_approve_representative+uuid,httpOptions)
    }else{
      return this.http.get<any>(this.url_approve_representative+uuid)
    }

  }
}
