import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class RepresentativeService {

  private urladd : string ='http://localhost:8080/api/representative/add';

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService
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
}
