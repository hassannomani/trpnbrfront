import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, switchMap, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CommonService } from '../common-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private url_base_ledger: string ='http://localhost:8080/api/bill/'
  
  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonServ: CommonService
  ) {}

  getAgentBillable(agentId: string): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any[]>(this.url_base_ledger+'billable-agt/'+agentId,httpOptions)
  }

  getTRPBillable(trpId: string): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any[]>(this.url_base_ledger+'billable-trp/'+trpId,httpOptions)
  }

  submitBill(billids: any): Observable<any>{
    const body=JSON.stringify(billids);
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.post<any>(this.url_base_ledger+'billSubmit',body,httpOptions)
  }
}
