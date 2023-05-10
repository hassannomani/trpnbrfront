import { Injectable } from '@angular/core';

export interface storedUser {
  id: string,
  username: string,
  token: string,
  roles: String,
  email: String
}
export interface storedAgntReptv{
  agent: {},
  representative: {}
}
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveStorageItems(obj :any){

    localStorage.setItem('token', JSON.stringify(obj.token));
    localStorage.setItem('id', JSON.stringify(obj.id));
    localStorage.setItem('username', JSON.stringify(obj.username));
    localStorage.setItem('email', JSON.stringify(obj.email));
    localStorage.setItem('role', JSON.stringify(obj.roles[0]));
  }

  getStorageItems(){

    let obj={
      "id": localStorage.getItem('id'),
      "username": localStorage.getItem('username'),
      "token": localStorage.getItem('token'),
      "email" : localStorage.getItem('email'),
      "role": localStorage.getItem('role')
    }
    return obj;
  }
  deletetorageItems(){
    localStorage.clear();
    return {
      "id": "",
      "username": "",
      "token": "",
      "role": "",
      "email": ""
    };
  }

  saveAgent(obj: any){
    localStorage.setItem("agent",JSON.stringify(obj))
  }
  getAgent(){
    let obj= localStorage.getItem("agent")
    return obj?JSON.parse(obj):""
  }
  deleteAgent(){
    localStorage.removeItem("agent")
  }
  saveRepresentative(obj: any){
    localStorage.setItem("representative",JSON.stringify(obj))
  }
  getRepresentative(){
    let obj= localStorage.getItem("representative")
    return obj?JSON.parse(obj):""
  }
  deleteRepresentative(){
    localStorage.removeItem("representative")
  }
}

