import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CommonService } from '../common-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonService: CommonService
  ) { }

  private url_get_all : string ='http://localhost:8080/api/ledgers';
  private url_agent : string ='http://localhost:8080/api/ledgers/agent/';
  private url_representative : string ='http://localhost:8080/api/ledgers/representative/';
  private urlallrangecommission: string ='http://localhost:8080/api/ledgers/range';


  
  getCommissionAgent(username: string): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any[]>(this.url_agent+username,httpOptions)
  }

   
  getCommissionRepresentative(username: string): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any[]>(this.url_representative+username,httpOptions)
  }

  getCommissionAll(): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url_get_all,httpOptions)
  }

  getAllRangeCommission(start: string,  end: string){
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
  
    return this.http.get<any[]>(this.urlallrangecommission+"/"+start+"/"+end, httpOptions)
  }
}
