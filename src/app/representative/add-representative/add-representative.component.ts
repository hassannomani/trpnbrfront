import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { forkJoin } from 'rxjs';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-representative',
  templateUrl: './add-representative.component.html',
  styleUrls: ['./add-representative.component.css']
})
export class AddRepresentativeComponent implements OnInit{

  addUser = new FormGroup({
    'username' : new FormControl('',[Validators.required, Validators.minLength(10)]),
    'password' : new FormControl('',[Validators.required, Validators.minLength(4)]),
    'repassword' : new FormControl('',[Validators.required, Validators.minLength(4)]),
    'firstName' : new FormControl('',[Validators.required, Validators.minLength(2)]),
    'lastName' : new FormControl('',[Validators.required, Validators.minLength(2)]),
    'email' : new FormControl('',[Validators.required]),
    'addedBy': new FormControl(''),
    'status': new FormControl(''),
    'photo': new FormControl(''),
    'roles': new FormControl('',[Validators.required])
  })

  addRepresentative = new FormGroup({
    'reName' : new FormControl('',[Validators.required]),
    'tinNo' : new FormControl('',[Validators.required]),
    'nid' : new FormControl('',[Validators.required]),
    'reMobileNo' : new FormControl('',[Validators.required]),
    'agentId' : new FormControl('',[Validators.required]),
    'bankAccountName': new FormControl('',[Validators.required]),
    'bankAccountNo': new FormControl('',[Validators.required]),
    'bankName': new FormControl('',[Validators.required]),
    'bankBranch': new FormControl('',[Validators.required]),
    'routingNo': new FormControl('',[Validators.required]),
    'reDob': new FormControl('',[Validators.required]),
    'bdivision': new FormControl('',[Validators.required]),
    'bdistrict': new FormControl('',[Validators.required]),
    'bthana': new FormControl('',[Validators.required]),
    'baddress': new FormControl('',[Validators.required]),
    'prdivision': new FormControl('',[Validators.required]),
    'prdistrict': new FormControl('',[Validators.required]),
    'prthana': new FormControl('',[Validators.required]),
    'praddress': new FormControl('',[Validators.required]),
    'pmdivision': new FormControl('',[Validators.required]),
    'pmdistrict': new FormControl('',[Validators.required]),
    'pmthana': new FormControl('',[Validators.required]),
    'pmaddress': new FormControl('',[Validators.required]),
    're_address': new FormControl(<Object>[]),
    're_bankinformation': new FormControl(<Object>[]),

  })
  addedSuccess: boolean = false
  failedCreation: boolean = false
  localStore: any = {}
  failed: boolean = false
  errorMsg: string = ""
  success: boolean = false
  successMsg: string = ""
  goSuccess: boolean = false
  bankfailed: boolean = false
  addressfailed: boolean = false
  buttonLabel: string= "Button"
  buttonColor: string = "primary"
  buttonType: string = "button"
  buttonLabel1: string= "Create User"
  buttonColor1: string = "primary"
  buttonType1: string = "button"
  division: any[] = []
  district: any[] = []
  thana: any[] = []
  bankInfo: any=[]
  index: any = -1
  addressArr: any =[]
  roles: any = []
  roleRep: any = []

  constructor(
    private representativeServ: RepresentativeService,  
    private commonService: CommonService,
    private localStorage: LocalStorageService,
    private router: Router,
    private userService: UserService 
  ){}
  ngOnInit(): void {
    this.localStore = this.localStorage.getStorageItems();
    if(this.localStore.token==""){
      this.router.navigate(['/logout']);
    }
    this.onTabChanged();
      forkJoin([this.commonService.getDistrict(),this.commonService.getDivision(),this.commonService.getThana(),this.userService.getRoles()])
      .subscribe({
        next: (data) => {
          //console.log(data)
          this.district = data[0];
          this.division = data[1];
          this.thana = data[2];
          this.roles = data[3];
        },
        error: (e) => {
         
            console.log("Error retrieving")
        }
      });
  }
  representativeSubmit(){
   
    this.addRepresentative.value['agentId'] = this.localStore.id
    this.addRepresentative.value['re_address']=this.addressArr
    //this.addAgent.value['address']?.push(this.businessAdd)
    this.addRepresentative.value['re_bankinformation'] = this.bankInfo 
      
    this.representativeServ
    .addRepresentative(this.addRepresentative.value)
    .subscribe({
      
      next: (data) => {
        if(data?.uuid!=""){
          this.success = true;
          this.addRepresentative.reset()
          this.failed=false;
        } 
        else{
          this.failed = true
        }
      },
      error: (e) => {
        this.failed = true
      }
      
    });

  }
  selectedTabChange($event:any) {
    this.index = $event.index
    console.log(this.index)
    this.onTabChanged()
  }

  saveAddresses(){
    let presentobj={
      type: "PRESENT",
      division: this.addRepresentative.value['prdivision'],
      district: this.addRepresentative.value['prdistrict'],
      thana: this.addRepresentative.value['prthana'],
      address: this.addRepresentative.value['praddress'],
      addedBy: "AGENT" 
    }
    let businessobj={
      type: "BUSINESS",
      division: this.addRepresentative.value['bdivision'],
      district: this.addRepresentative.value['bdistrict'],
      thana: this.addRepresentative.value['bthana'],
      address: this.addRepresentative.value['baddress'],
      addedBy: "AGENT" 
    }
    let permanentobj={
      type: "PERMANENT",
      division: this.addRepresentative.value['pmdivision'],
      district: this.addRepresentative.value['pmdistrict'],
      thana: this.addRepresentative.value['pmthana'],
      address: this.addRepresentative.value['pmaddress'],
      addedBy: "AGENT" 
    }
  //this.agentService.addAddress
    forkJoin([
      this.commonService.addAddress(presentobj),
      this.commonService.addAddress(businessobj),
      this.commonService.addAddress(permanentobj)
    ])
    .subscribe({
      next: (data) => {
        //console.log(data)
        
        if(data?.length<3)
          this.addressfailed = true
        else{
          this.addressArr.push(presentobj)
          this.addressArr.push(businessobj)
          this.addressArr.push(permanentobj)
        }
      },
      error: (e) => {
        
          console.log("Error retrieving")
          this.addressfailed = true
      }
    });
  }

  saveBankDetails(){
    let bankObj={
      bankAccountName: this.addRepresentative.value['bankAccountName'],
      bankAccountNo: this.addRepresentative.value['bankAccountNo'],
      bankName: this.addRepresentative.value['bankName'],
      bankBranch: this.addRepresentative.value['bankBranch'],
      routingNo: this.addRepresentative.value['routingNo']
    }

    this.commonService
    .addBank(bankObj)
    .subscribe({
      
      next: (data) => {
        if(data?.token!=""){
          this.bankInfo.push(bankObj);
        } 
        else{
          this.bankfailed = true
        }
      },
      error: (e) => {
        this.bankfailed = true
      }
      
    });
  }

  registerUser(){
    this.addUser.value['addedBy']="Agent"
    this.addUser.value['status']="0"
    this.addUser.value['photo']=""
    let index = -1;
    for(let i=0;i<this.roles.length;i++){
      if(this.roles[i].name=="ROLE_REPRESENTATIVE"){
        this.roleRep.push( this.roles[i])
        break;
      }
    }
    this.addUser.value['roles'] = this.roleRep;
    this.userService.addUsers(this.addUser.value).subscribe({
     
      next: (data) => {
        if(data.uuid){
          this.addedSuccess = true
          this.addRepresentative.get("reName")?.setValue(data.firstName+" "+data.lastName)
          this.addRepresentative.get("tinNo")?.setValue(data.username)
          //console.log(this.roles)
        } 
        else{
          this.failedCreation = true
        }
      },
      error: (e) => {
        this.failedCreation = true
      }  
    });
    
  
  }
  
  onTabChanged() {
    console.log(this.index)
    if(this.index==1){
      this.registerUser()
    }
    else if (this.index==2) {
      this.saveBankDetails()
    } else if (this.index==3) {
      this.saveAddresses()
    }
  }

}
