import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class SigninService {
  private loggedIn: Subject<boolean> = new ReplaySubject<boolean>(1);

  private url : string ='http://localhost:8080/api/auth/signin';
  private url1 : string ='http://localhost:8080/api/auth/logout';
  
  constructor(
    private http: HttpClient,
    private localstorageserv: LocalStorageService
  ) {}
  postVerifyUsers(formData:any): Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(formData);
    console.log(body)
    return this.http.post(this.url, body,{'headers':headers}).pipe(
      tap(() => this.loggedIn.next(true)));
  }

  loginStatusChange(): Observable<boolean> {
    let object = this.localstorageserv.getStorageItems()
    if(object.token!=""&&object.token!=null){
       this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable()
  }
  
  logout(): Observable<any> {
    this.localstorageserv.deletetorageItems()
    return this.http.post(this.url1, {}).pipe(
      tap(() => this.loggedIn.next(false)));
  }
}
