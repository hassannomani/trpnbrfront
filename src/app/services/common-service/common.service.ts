import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService
  ) { }

  private urldistrict : string ='http://localhost:8080/api/common/district';
  private urldiv : string ='http://localhost:8080/api/common/division';
  private urlthana : string ='http://localhost:8080/api/common/thana';
  private urlbank : string ='http://localhost:8080/api/common/bank';
  private urladdaddress : string ='http://localhost:8080/api/address/add';
  private urladdbank : string ='http://localhost:8080/api/bank/add';
  private urlbankdist : string ='http://localhost:8080/api/common/bankdist';
  private urlbankbranches : string ='http://localhost:8080/api/common/bankbranches/';
  private urlfile : string ='http://localhost:8080/api/common/file';
  private urlPhoto : string ='http://localhost:8080/api/common/photo';
  private urlfileget : string ='http://localhost:8080/api/common/file/';
  private urlPhotoget : string ='http://localhost:8080/api/common/photo/';
  private urletin : string ='http://localhost:8080/api/etin/tin/';


  getDistrict(): Observable<any[]>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
        })
  
        const httpOptions = {
          headers: headers_object
        };
        
      return this.http.get<any[]>(this.urldistrict,httpOptions)
    }else{
      return this.http.get<any[]>(this.urldistrict)
    }

  }

  
  getDivision(): Observable<any[]>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
        })
  
        const httpOptions = {
          headers: headers_object
        };
        
      return this.http.get<any[]>(this.urldiv,httpOptions)
    }else{
      return this.http.get<any[]>(this.urldiv)
    }

  }

  getThana(): Observable<any[]>{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
        })
  
        const httpOptions = {
          headers: headers_object
        };
        
      return this.http.get<any[]>(this.urlthana,httpOptions)
    }else{
      return this.http.get<any[]>(this.urlthana)
    }

  }

  addAddress(formData: any): Observable<any>{

    let obj = this.localStorageServc.getStorageItems()
    const body=JSON.stringify(formData);

    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
      })
  
      const httpOptions = {
        headers: headers_object
      };
        
      return this.http.post<any>(this.urladdaddress,body,httpOptions)
    }else{
      return this.http.post<any[]>(this.urladdaddress,body)
    }

  }

  addBank(formData: any): Observable<any>{
    let obj = this.localStorageServc.getStorageItems()
    const body=JSON.stringify(formData);

    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
      })
  
      const httpOptions = {
        headers: headers_object
      };
        
      return this.http.post<any>(this.urladdbank,body,httpOptions)
    }else{
      return this.http.post<any[]>(this.urladdbank,body)
    }
  }

  httpReturner(): any{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
      })
  
    }else{
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ""
      })
    }
    return headers_object

  }

  httpReturnerCustom(): any{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
      })
  
    }else{
      var headers_object = new HttpHeaders({
        'Authorization': ""
      })
    }
    return headers_object

  }

  httpReturnerBlob(): any{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Authorization': "Bearer "+ JSON.parse(obj.token), 
        'Content-Type': 'application/pdf',
      })
  
    }else{
      var headers_object = new HttpHeaders({
        'Authorization': ""
      })
    }
    return headers_object

  }
  
  getBank(): Observable<any[]>{

    const httpOptions = {
      headers: this.httpReturner()
    };
  
    return this.http.get<any[]>(this.urlbank,httpOptions)
    
  }

  getBankDist(): Observable<any[]>{

    const httpOptions = {
      headers: this.httpReturner()
    };
  
    return this.http.get<any[]>(this.urlbankdist,httpOptions)
    
  }

  getBankBranches(name: string, district: string): Observable<any[]>{

    const httpOptions = {
      headers: this.httpReturner()
    };
  
    return this.http.get<any[]>(this.urlbankbranches+name+"/"+district,httpOptions)
    
  }

  getTin(tin: string): Observable<any>{

    const httpOptions = {
      headers: this.httpReturner()
    };
  
    return this.http.get<any>(this.urletin+tin,httpOptions)
    
  }

  uploadFile(file: File): Observable<any>{

    const httpOptions = {
      headers: this.httpReturnerCustom()
    };
    const formData: FormData = new FormData();
    formData.append('file', file);
  
    return this.http.post<any>(this.urlfile,formData, httpOptions)
    
  }

  loadFile(filename: String): Observable<any>{
    const httpOptions = {
      headers: this.httpReturnerBlob()
    };
    let headers = new HttpHeaders();
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=null){
      headers = headers.set('Accept', 'application/pdf');
      headers =headers.set( 'Authorization', "Bearer "+ JSON.parse(obj.token))
    }
  
    return this.http.get(this.urlfileget+filename, {headers, responseType: 'blob'})

  }

  uploadPhoto(file: File): Observable<any>{

    const httpOptions = {
      headers: this.httpReturnerCustom()
    };
    const formData: FormData = new FormData();
    formData.append('file', file);
  
    return this.http.post<any>(this.urlPhoto,formData, httpOptions)
    
  }

  loadPhoto(filename: String): Observable<any>{
    const httpOptions = {
      headers: this.httpReturnerBlob()
    };
    let headers = new HttpHeaders();
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=null){
      //headers = headers.set('Accept', 'application/pdf');
      headers =headers.set( 'Authorization', "Bearer "+ JSON.parse(obj.token))
    }
  
    return this.http.get(this.urlPhotoget+filename, {headers, responseType: 'blob'})

  }
}
