import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CommonService } from '../common-service/common.service';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private base_url : string ='http://localhost:8080/api/'
  private cert_base_url : string =this.base_url+"certificate"
  private otp_base_url : string =this.base_url+"otp"
  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonService: CommonService
  ) {}

  checkCertificate(tin: any, nid: any){
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
      return this.http.get<any>(this.cert_base_url+"/check/"+tin+"/"+nid,httpOptions)
  }

  sendOTP(mobile: any){
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
      return this.http.get<any>(this.otp_base_url+"/"+mobile,httpOptions)
  }

  submitOTP(mobile: any, otp: any){
    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
      return this.http.get<any>(this.otp_base_url+"/validate/"+mobile+"/"+otp,httpOptions)
  }

}
