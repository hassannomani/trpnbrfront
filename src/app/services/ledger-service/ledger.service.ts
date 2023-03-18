import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CommonService } from '../common-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {

  private urlagentledger: string ='http://localhost:8080/api/ledgers/agent/';
  private urlrepledger: string ='http://localhost:8080/api/ledgers/representative/';
  private urladmledger: string ='http://localhost:8080/api/ledgers/admin';
  private urlallrangeledger: string ='http://localhost:8080/api/ledgers/range';

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonServ: CommonService
  ) {}

  getAgentLedger(agentId: string): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any[]>(this.urlagentledger+agentId,httpOptions)

  }

  getRepresentativeLedger(representativeId: string): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any[]>(this.urlrepledger+representativeId,httpOptions)

  }

  getAdminLedger(): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any[]>(this.urladmledger,httpOptions)

  }

  getAllRangeLedger(start: string,  end: string){
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    let body = {
      "start": start,
      "end": end
    }
    let finalBody = JSON.stringify(body)
    return this.http.post<any[]>(this.urladmledger, body, httpOptions)
  }
}
