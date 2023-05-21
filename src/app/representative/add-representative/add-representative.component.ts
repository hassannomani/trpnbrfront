import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { forkJoin } from 'rxjs';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { AgentService } from 'src/app/services/agent-service/agent.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { formatDate } from '@angular/common' 

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
    'bankDistName': new FormControl('',[Validators.required]),
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
    'checked': new FormControl('',[Validators.required]),
    'display': new FormControl('',[Validators.required]),
    'trpId': new FormControl('',[Validators.required]),
    'refNo': new FormControl('',[Validators.required]),
    'file': new FormControl('',[Validators.required]),
    're_address': new FormControl(<Object>[]),
    're_bankinformation': new FormControl(<Object>[]),

  })
  addedSuccess: boolean = false
  addedSuccess2: boolean = false
  addedSuccess3: boolean = false
  failedCreation: boolean = false
  duplicateEntry: boolean = false
  localStore: any = {}
  failed: boolean = false
  errorMsg: string = ""
  success: boolean = false
  successMsg: string = ""
  goSuccess: boolean = false
  bankfailed: boolean = false
  addressfailed: boolean = false
  buttonLabel: string= "Submit"
  buttonColor: string = "primary"
  buttonType: string = "button"
  buttonLabel1: string= "Create User"
  buttonColor1: string = "primary"
  buttonType1: string = "button"
  buttonLabel2: string= "Save and Continue"
  buttonColor2: string = "primary"
  buttonType2: string = "button"
  buttonLabel3: string= "Uploaad"
  buttonColor3: string = "primary"
  buttonType3: string = "button"
  division: any[] = []
  district: any[] = []
  thana: any[] = []
  bankInfo: any=[]
  index: any = 0
  addressArr: any =[]
  roles: any = []
  roleRep: any = []
  bDistrict: any = []
  bThana: any = []
  pmDistrict: any = []
  pmThana: any = []
  prDistrict: any = []
  prThana: any = []
  agentId: any = ""
  banks: any = []
  bankdist: any = []
  bankBranches: any = []
  bankName: string = ""
  noDataFound: boolean = false
  routeNo: string = ""
  saving: boolean = false
  savingMsg: string = ""
  step1Success : boolean = false
  step2Success : boolean = false
  tinnotFound : boolean = false
  file!: File;
  file_list: Array<string> = [];
  constructor(
    private representativeServ: RepresentativeService,  
    private commonService: CommonService,
    private localStorage: LocalStorageService,
    private router: Router,
    private userService: UserService,
    private agentService: AgentService,
    private titleService:Title
 
  ){
    this.titleService.setTitle("Add Representative");

  }
  ngOnInit(): void {
    this.localStore = this.localStorage.getStorageItems();
    if(this.localStore.token==""){
      this.router.navigate(['/logout']);
    }
    this.onTabChanged();
      forkJoin(
        [this.commonService.getDistrict(),
        this.commonService.getDivision(),
        this.commonService.getThana(),
        this.userService.getRoles(),
        this.agentService.getAgentInfo(JSON.parse(this.localStore.username)),
        this.commonService.getBank(),
        this.commonService.getBankDist()])
      .subscribe({
        next: (data) => {
          //console.log(data)
          this.district = data[0];
          this.division = data[1];
          this.thana = data[2];
          this.roles = data[3];
          this.agentId = data[4].id;
          this.banks = data[5];
          this.bankdist = data[6];
        },
        error: (e) => {
         
            console.log("Error retrieving")
        }
      });
  }
  
  representativeSubmit(){
    this.saving = true
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
        this.saving = false
      }
      
    });
    

  }

  representativeSave(){
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
      if(data?.uuid!=""){
        this.bankInfo.push(bankObj);
        if(this.bankInfo.length){

          this.addRepresentative.value['agentId'] = this.agentId
          this.addRepresentative.value['re_address']=this.addressArr
          //this.addAgent.value['address']?.push(this.businessAdd)
          this.addRepresentative.value['re_bankinformation'] = this.bankInfo 
            
          this.representativeServ
          .addRepresentative(this.addRepresentative.value)
          .subscribe({
            
            next: (data) => {
              if(data?.userid!=""){
                this.success = true;
                this.saving = false
                this.addRepresentative.reset()
                this.failed=false;
              } 
              else{
                this.saving = false
                this.failed = true
              }
            },
            error: (e) => {
              this.failed = true
              this.saving = false

            }

          })
        } 
        else{
          this.bankfailed = true
        }
      }
    },
    error: (e) => {
      this.bankfailed = true
      this.saving = false
    }
    
  });}

  selectedTabChange($event:any) {
    this.index = $event.index
    console.log(this.index)
    this.onTabChanged()
  }

  saveAddresses(){
    let prdistrict:any={}
    prdistrict=this.addRepresentative.value['prdistrict']
    let bdistrict:any={}
    bdistrict=this.addRepresentative.value['bdistrict']
    let pmdistrict:any={}
    pmdistrict=this.addRepresentative.value['pmdistrict']
    let presentobj={
      type: "PRESENT",
      division: this.addRepresentative.value['prdivision'],
      district: prdistrict.name,
      thana: this.addRepresentative.value['prthana'],
      address: this.addRepresentative.value['praddress'],
      addedBy: "AGENT" 
    }
    let businessobj={
      type: "BUSINESS",
      division: this.addRepresentative.value['bdivision'],
      district: pmdistrict.name,
      thana: this.addRepresentative.value['bthana'],
      address: this.addRepresentative.value['baddress'],
      addedBy: "AGENT" 
    }
    let permanentobj={
      type: "PERMANENT",
      division: this.addRepresentative.value['pmdivision'],
      district: pmdistrict.name,
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
          this.index+=1;
          this.step2Success = true
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
        this.saving = false
      }
      
    });
  }

  registerUser(){
   
    this.addUser.value['addedBy']=JSON.parse(this.localStore.id)
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
          this.addUser.reset()
          this.index +=1
          //console.log(this.roles)
        } 
        else{
          this.failedCreation = true
        }
      },
      error: (e) => {
        if(e.status==400)
          this.duplicateEntry = true
        else
          this.failedCreation = true
      }  
    });
    
  
  }
  
  onTabChanged() {
    console.log(this.index)
    if(this.index==1){
      //this.registerUser()
    }
    else if (this.index==2) {
      //this.saveBankDetails()
    } else if (this.index==3) {
      //his.saveAddresses()
    }
  }
  step1(){
    this.step1Success = true
    this.index+=1;
  }
  step2(){
  
    this.saveAddresses();
  }

  bdivisionChange(value:any){
    console.log(value)
    this.bDistrict = []
    for(let i=0;i<this.district.length;i++){
      if(this.district[i].divisionId==value)
      this.bDistrict.push(this.district[i])
    }
  }

  bdistrictChange(value:any){
    console.log(value)
    this.bThana = []
    this.addRepresentative.value['bdistrict']=value.name
    for(let i=0;i<this.thana.length;i++){
      if(this.thana[i].districtId==value.districtId)
      this.bThana.push(this.thana[i])
    }
  }

  prdivisionChange(value:any){
    console.log(value)
    this.prDistrict = []
    for(let i=0;i<this.district.length;i++){
      if(this.district[i].divisionId==value)
      this.prDistrict.push(this.district[i])
    }
  }

  prdistrictChange(value:any){
    console.log(value)
    this.addRepresentative.value['prdistrict']=value.name
    this.prThana = []
    for(let i=0;i<this.thana.length;i++){
      if(this.thana[i].districtId==value.districtId)
      this.prThana.push(this.thana[i])
    }
  }

  pmdivisionChange(value:any){
    console.log(value)
    this.pmDistrict = []
    for(let i=0;i<this.district.length;i++){
      if(this.district[i].divisionId==value)
      this.pmDistrict.push(this.district[i])
    }
  }

  pmdistrictChange(value:any){
    console.log(value)
    this.pmThana = []
    for(let i=0;i<this.thana.length;i++){
      if(this.thana[i].districtId==value.districtId)
      this.pmThana.push(this.thana[i])
    }
  }
  bankChange(value:any){
    this.bankName = value
  }
  bankDistChange(value:any){
    console.log(value)
    this.commonService
    .getBankBranches(this.bankName,value)
    .subscribe({
      
      next: (data) => {
        if(data.length){ //uuid
          //this.success = true;
         this.bankBranches = data
        } 
        else{
          this.noDataFound=true            
        }
      },
      error: (e) => {
        this.noDataFound=true            
      }
      
    });
  }

  bankBranchChange(value: any){
    for(let i=0;i<this.bankBranches.length;i++){
      if(this.bankBranches[i].branchName==value){
        this.routeNo = this.bankBranches[i].routingNo
        this.addRepresentative.get('routingNo')?.setValue(this.routeNo)
        break;
      }
    }
  }

  checkAddress($event:any){
    let pmaddress= this.addRepresentative.value['pmaddress']
      console.log(pmaddress)
      if(pmaddress!=null)
        this.addRepresentative.get('praddress')?.setValue(pmaddress)
      let div = this.addRepresentative.value['pmdivision']
      console.log(div)

      if(div!=null)
        this.addRepresentative.get('prdivision')?.setValue(div)

      this.prdivisionChange(div)

      let dist = this.addRepresentative.value['pmdistrict']
      console.log(dist)
      console.log(this.prDistrict)
      if(dist!=null)
        this.addRepresentative.get('prdistrict')?.setValue(dist)
      this.prdistrictChange(dist)
      
      let thana = this.addRepresentative.value['pmthana']
      if(thana!=null)
        this.addRepresentative.get('prthana')?.setValue(thana)
  }
  verify(){
    let username = this.addUser.value["username"]?this.addUser.value["username"]:""
    this.commonService.getTin(username).subscribe({
      next: (data) => {
        console.log(data)
        if(data.isError==1){
          this.tinnotFound = true
        }else{
          this.localStorage.saveRepresentative(data)
          this.addUser.get('email')?.setValue(data.email)
          let name = data.name
          if(name!=null && name!=''){
            let split = name.split(" ")
            let lastpart=""
            this.addUser.get("firstName")?.setValue(split[0])
            for (let i=1;i<split.length;i++)
              lastpart+=split[i]+" "
            this.addUser.get("lastName")?.setValue(lastpart)
            let dt= new Date(data.dob)
            this.setDate(dt)
            this.addRepresentative.get('reMobileNo')?.setValue(data.mobile)
            let pattern = /\d+/g
            let string= data.nid  
            let final = string.match(pattern)
            if(final.length)
              this.addRepresentative.get('nid')?.setValue(final[0])
          }
        }
      },
      error: (e) => {
        console.log(e)

      }  
    })
  }
  setDate(value:any){
    this.addRepresentative.get('reDob')?.setValue(formatDate(value,'yyyy-MM-dd','en'))

  }
  selectFile(event: any){
    this.file = event.target.files.item(0);
  }

  uploadFile() {
    this.commonService.uploadFile(this.file).subscribe({
      next: (data) => {
        console.log(data)
        //this.fileDetails = data;
        //this.fileUris.push(this.fileDetails.fileUri);
        //alert("File Uploaded Successfully")
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
