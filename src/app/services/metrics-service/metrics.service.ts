import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CommonService } from '../common-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonService: CommonService
  ) { }

  private url_post_metrics : string ='http://localhost:8080/api/metrics/save';

  saveMetrics(formData: any): Observable<any>{
    const body=JSON.stringify(formData);
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.post<any>(this.url_post_metrics,body,httpOptions)
  }
}
