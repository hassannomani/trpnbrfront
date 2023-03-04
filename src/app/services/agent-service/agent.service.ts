import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CommonService } from '../common-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private urladd : string ='http://localhost:8080/api/agent/add';
  private urlall : string ='http://localhost:8080/api/agent/all';
  private urlanagent : string ='http://localhost:8080/api/users/user/';
  private urlagent: string ='http://localhost:8080/api/agent/';
  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonServ: CommonService
  ) {}

  
  addAgent(formData: any): Observable<any>{
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

  getAll(): Observable<any[]>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
      })

      const httpOptions = {
        headers: headers_object
      };
      
      return this.http.get<any[]>(this.urlall,httpOptions)
    }else{
      return this.http.get<any[]>(this.urlall)
    }
  }

  getAnAgent(uname: string): Observable<any>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
      })

      const httpOptions = {
        headers: headers_object
      };
      
      return this.http.get<any[]>(this.urlanagent+uname,httpOptions)
    }else{
      return this.http.get<any[]>(this.urlanagent+uname)
    }
  }

  getAgentInfo(uname: string): Observable<any>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
      })

      const httpOptions = {
        headers: headers_object
      };
      
      return this.http.get<any>(this.urlagent+uname,httpOptions)
    }else{
      return this.http.get<any>(this.urlagent+uname)
    }
  }


}
