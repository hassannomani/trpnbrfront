import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {SafeResourceUrl, Title} from "@angular/platform-browser";
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { FormControl, FormGroup, NgForm, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user-service/user.service';
import { RegisterService } from 'src/app/services/register-service/register.service';
import { CommonService } from 'src/app/services/common-service/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  buttonLabel: string = "Check"
  buttonColor: string = "primary"
  buttonType: string = "button"
  buttonLabel1: string = "Validate"
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  message : string = ""
  localStoreObj : any = {}
  username : string = ""
  agentId: string = ""
  otpShow: Boolean = false
  registerForm = new FormGroup({
    'tinNo' : new FormControl('',[Validators.required]),
    'nid' : new FormControl('',[Validators.required]),
    'phoneNo' : new FormControl('',[Validators.required]),
    'otp' : new FormControl('',[Validators.required])
  })

  constructor(
    private router: Router,
    private titleService:Title,
    private route: ActivatedRoute,
    private localStore: LocalStorageService,
    private _snackBar: MatSnackBar,
    private userServ: UserService,
    private registerServ: RegisterService,
    private commonServ: CommonService
  ){
    this.titleService.setTitle("Register");
  }

  taxpayerSubmit(){
    this.message=""
    let tin = this.registerForm.value['tinNo']
    let tin12 = tin==null?false:tin.length==12?true:false
    let tinNum = this.isNumCheck(tin)
    let tinValid = tin12 && tinNum
    if(!tinValid)
      this.message = "TIN no is not valid. "

    let nid =  this.registerForm.value['nid']
    let nidLength = nid==null?false:nid.length==10||nid.length==13||nid.length==17?true:false
    let nidNum = this.isNumCheck(nid)
    let nidValid = nidLength && nidNum
    if(!nidValid)
      this.message = this.message + "NID is not valid. "

    let mobile = this.registerForm.value['phoneNo']
    let mobileStart = mobile?.startsWith("01")
    let mobileLength = mobile==null?false:mobile.length==11?true:false
    let mobileNum = this.isNumCheck(mobile)
    let mobileValid = mobileStart && mobileLength && mobileNum
    if(!mobileValid)
      this.message = this.message + "Mobile No is not valid. "
    if(!tinValid||!nidValid||!mobileValid)
      this.openSnackBar()
    else{
      this.threeStepsProcessing()
    }
      this.otpShow = true
  }
  isNumCheck(val: any){
    return /^\d+$/.test(val);
  }

  
  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }
  otpSubmit(){

  }

  threeStepsProcessing(){
    this
    .registerServ
    .checkCertificate(this.registerForm.value['tinNo'], this.registerForm.value['nid']).subscribe({
      next: (data) => {
        if(data==true||data=="true"){ //second chaining
          this.getTinValidation(this.registerForm.value['tinNo'])
        }else{
          this.message = "No certificate found with this NID and TIN"
          this.openSnackBar()
        }

      }
      ,
      error: (e) => {
        this.message = "Error occurred! Try again later!"
        this.openSnackBar()
      }
    })
  }

  getTinValidation(tin : any){
    this.commonServ.getTin(tin).subscribe({
      next: (data) => {
        if(data.isError==1){
          this.message = "TIN not found"
        }else{
          this.getMobileValidated(this.registerForm.value['phoneNo'])
        }
      }
      ,
      error: (e) => {
        this.message = "Error occurred! Try again later!"
        this.openSnackBar()
      }      
    })
  }

  getMobileValidated(mobile: any){

  }
}
