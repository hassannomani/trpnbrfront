import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CommonService } from '../common-service/common.service';

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
  private url_reject_representative : string ='http://localhost:8080/api/users/reject/';
  private url_reject_representative_tin : string ='http://localhost:8080/api/users/tinreject/';
  private url_approve_representative_tin : string ='http://localhost:8080/api/users/tinapprove/';

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonService: CommonService
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
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any[]>(this.url_list,httpOptions)
  }

  getAllPendingUsers(): Observable<any[]>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any[]>(this.url_pending_all,httpOptions)
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
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url_approve_representative+uuid,httpOptions)
  }

  approvePendingUserByTin(username:string): Observable<any>{
    let obj = this.localStorageServc.getStorageItems()
   
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
        })
  
        const httpOptions = {
          headers: headers_object
        };
        
      return this.http.get<any>(this.url_approve_representative_tin+username,httpOptions)
    }else{
      return this.http.get<any>(this.url_approve_representative_tin+username)
    }

  }

  rejectPendingUser(uuid:string): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
        
    return this.http.get<any>(this.url_reject_representative+uuid,httpOptions)
  }

  rejectPendingUserByTin(tin:string): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
      return this.http.get<any>(this.url_reject_representative+tin,httpOptions)
  }

}
