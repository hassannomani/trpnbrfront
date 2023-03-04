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

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonServ: CommonService
  ) {}

  getAgentLedger(agentId: string): Observable<any[]>{
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any>(this.urlagentledger+agentId,httpOptions)

  }
}
