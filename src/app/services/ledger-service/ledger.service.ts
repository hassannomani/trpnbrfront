import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, switchMap, tap } from 'rxjs';
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
  private urlallreprangeledger: string ='http://localhost:8080/api/ledgers/range-representative/';
  private urlallagrangeledger: string ='http://localhost:8080/api/ledgers/range-agent/';
  private representativeGet: string = 'http://localhost:8080/api/respresentative/'
  private urlagentGet: string ='http://localhost:8080/api/agent/';
  private urlsingleledger: string ='http://localhost:8080/api/ledgers/';
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
  
    return this.http.get<any[]>(this.urlallrangeledger+"/"+start+"/"+end, httpOptions)
  }

  getRepresentativeRangeLedger(start: string,  end: string, repId: string){
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }

    return this
      .http.get<any>(this.representativeGet+repId, httpOptions)
      .pipe(
        switchMap(representative=>this.http.get(this.urlallreprangeledger+representative.userid+"/"+start+"/"+end, httpOptions))
      )
    
  }

  getAgentRangeLedger(start: string,  end: string, agId: string){
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    console.log(start+" "+end)
    return this
      .http.get<any>(this.urlagentGet+agId, httpOptions)
      .pipe(
        switchMap(agent=>this.http.get(this.urlallagrangeledger+agent.id+"/"+start+"/"+end, httpOptions))
      )
    
  }

  getLedgerById(id: string){
    const httpOptions = {
      headers: this.commonServ.httpReturner()
    }
    return this.http.get<any>(this.urlsingleledger+id, httpOptions)
  }
}
