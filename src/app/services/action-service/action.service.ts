import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CommonService } from '../common-service/common.service';
@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonService: CommonService
  ) { }

  private url_post_action : string ='http://localhost:8080/api/action/save';
  private url_get_action_sts : string ='http://localhost:8080/api/action/status/';
  private url_get_action_msg : string ='http://localhost:8080/api/action/message/';
  private url_get_blocked : string ='http://localhost:8080/api/users/blocked';
  private url_get_denied : string ='http://localhost:8080/api/users/denied';
  private url_get_unblock : string ='http://localhost:8080/api/users/unblock/';
  private url_get_undeny : string ='http://localhost:8080/api/users/tinapprove/';
  private url_get_msgs : string ='http://localhost:8080/api/action/messages/';


  saveAction(formData: any): Observable<any>{
    const body=JSON.stringify(formData);
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.post<any>(this.url_post_action,body,httpOptions)
  }

  getStatus(username: string): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url_get_action_sts+username,httpOptions)
  }

  getMessage(id: string): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url_get_action_msg+id,httpOptions)
  }

  getBlockedUser(): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url_get_blocked,httpOptions)
  }

  unBlockUser(tin : string): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url_get_unblock+tin,httpOptions)
  }

  getDeniedUser(): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url_get_denied,httpOptions)
  }

  unDenyUser(tin : string): Observable<any>{
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.url_get_undeny+tin,httpOptions)
  }

}

