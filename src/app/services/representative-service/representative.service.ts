import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CommonService } from 'src/app/services/common-service/common.service';


@Injectable({
  providedIn: 'root'
})
export class RepresentativeService {

  private urladd : string ='http://localhost:8080/api/representative/add';
  private urlgetrep : string ='http://localhost:8080/api/representative/';
  private urlgetrepsbyagentid : string ='http://localhost:8080/api/representative/agent/';
  private urlgetAllRep : string ='http://localhost:8080/api/representative/all';

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonService: CommonService,
  ) {}


  addRepresentative(formData: any): Observable<any>{
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

  getARepresentative(username: string): Observable<any>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
      })

      const httpOptions = {
        headers: headers_object
      };
      
      return this.http.get(this.urlgetrep+username,httpOptions)

    }else{
      
      return this.http.get(this.urlgetrep+username)
    }
  }

  getRepresentativeUnderAnAgent(tin: string): Observable<any[]>{
    
    const headerObj = this.commonService.httpReturner()
    const httpOptions = {
      headers: headerObj
    };
    return this.http.get<any[]>(this.urlgetrepsbyagentid+tin,httpOptions);

  }

  getAllRepresentatives(): Observable<any[]>{
    
    const headerObj = this.commonService.httpReturner()
    const httpOptions = {
      headers: headerObj
    };
    return this.http.get<any[]>(this.urlgetAllRep,httpOptions);

  }
}
