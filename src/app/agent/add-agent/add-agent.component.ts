import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { forkJoin } from 'rxjs';
import { AgentService } from 'src/app/services/agent-service/agent.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import { ActivatedRoute, Route } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent implements OnInit{
    addAgent = new FormGroup({
      'name' : new FormControl('',[Validators.required]),
      'tin' : new FormControl('',[Validators.required]),
      'phone' : new FormControl('',[Validators.required]),
      'registrationType' : new FormControl('',[Validators.required]),
      'registrationNo' : new FormControl('',[Validators.required]),
      'registrationDate' : new FormControl('',[Validators.required]),
      'contactPerson' : new FormControl('',[Validators.required]),
      'contactNumber' : new FormControl('',[Validators.required]),
      'contactEmail': new FormControl( '',[Validators.required]),
      'bankAccountName': new FormControl('',[Validators.required]),
      'bankAccountNo': new FormControl('',[Validators.required]),
      'bankName': new FormControl('',[Validators.required]),
      'bankDistName': new FormControl('',[Validators.required]),
      'bankBranch': new FormControl('',[Validators.required]),
      'routingNo': new FormControl('',[Validators.required]),
      'fatherName': new FormControl(''),
      'motherName': new FormControl(''),
      'spouseName': new FormControl(''),
      'regAssNID': new FormControl(''),
      'dob': new FormControl(''),
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
      'address': new FormControl(<Object>[]),
      'bankinformation': new FormControl(<Object>[]),
      
    })
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

    buttonLabel1: string= "Calculate"
    buttonColor1: string = "success"
    buttonType1: string = "button"
    division: any[] = []
    district: any[] = []
    thana: any[] = []
    bankInfo: any=[]
    index: any = 0
    addressArr: any =[]
    bDistrict: any = []
    bThana: any = []
    pmDistrict: any = []
    pmThana: any = []
    prDistrict: any = []
    prThana: any = []
    banks: any = []
    bankdist: any = []
    bankBranches: any = []
    bankName: string = ""
    noDataFound: boolean = false
    routeNo: string = ""
    constructor(
      private agentService: AgentService,  
      private commonService: CommonService, 
      private route: ActivatedRoute,
      private userService: UserService,
      private titleService:Title
    ){
      this.titleService.setTitle("Add Agent");
    }
    ngOnInit(): void {
      this
      .route
      .queryParams
      .subscribe(paramsg=>{
        let uname = paramsg['username']
        if(uname!=null){
          this.userService.getAUser(uname).subscribe({
            next: (data) => {
              console.log(data)
              if(data.uuid){
                this.addAgent.get('name')?.setValue(data.firstName+" "+data.lastName);
                this.addAgent.get('tin')?.setValue(data.username)
              }
            },
            error: (e) => {
             
                console.log("Error retrieving")
            }
          })
        }

      })

      

      this.onTabChanged();
      forkJoin([this.commonService.getDistrict(),this.commonService.getDivision(),this.commonService.getThana(),this.commonService.getBank(),this.commonService.getBankDist()])
      .subscribe({
        next: (data) => {
          //console.log(data)
          this.district = data[0];
          this.division = data[1];
          this.thana = data[2];
          this.banks = data[3];
          this.bankdist = data[4];
        },
        error: (e) => {
         
            console.log("Error retrieving")
        }
      });
    }
    agentSubmit(){

      this.addAgent.value['address']=this.addressArr
      //this.addAgent.value['address']?.push(this.businessAdd)
      this.addAgent.value['bankinformation'] = this.bankInfo 
      
      this.agentService
      .addAgent(this.addAgent.value)
      .subscribe({
        
        next: (data) => {
          if(data?.id!=""){ //uuid
            this.success = true;
            this.addAgent.reset()
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

    saveAddresses(){
      let prdistrict:any={}
      prdistrict=this.addAgent.value['prdistrict']
      let bdistrict:any={}
      bdistrict=this.addAgent.value['bdistrict']
      let pmdistrict:any={}
      pmdistrict=this.addAgent.value['pmdistrict']
      let presentobj={
        type: "PRESENT",
        division: this.addAgent.value['prdivision'],
        district: prdistrict.name,
        thana: this.addAgent.value['prthana'],
        address: this.addAgent.value['praddress'],
        addedBy: "ADMIN" 
      }
      let businessobj={
        type: "BUSINESS",
        division: this.addAgent.value['bdivision'],
        district: bdistrict.name,
        thana: this.addAgent.value['bthana'],
        address: this.addAgent.value['baddress'],
        addedBy: "ADMIN" 
      }
      let permanentobj={
        type: "PERMANENT",
        division: this.addAgent.value['pmdivision'],
        district: pmdistrict.name,
        thana: this.addAgent.value['pmthana'],
        address: this.addAgent.value['pmaddress'],
        addedBy: "ADMIN" 
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
        bankAccountName: this.addAgent.value['bankAccountName'],
        bankAccountNo: this.addAgent.value['bankAccountNo'],
        bankName: this.addAgent.value['bankName'],
        bankBranch: this.addAgent.value['bankBranch'],
        routingNo: this.addAgent.value['routingNo']
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
    

    selectedTabChange($event:any) {
      this.index = $event.index
      console.log(this.index)
      this.onTabChanged()
    }
    
    onTabChanged() {
      if (this.index==0) {
        
      } else if (this.index==2) {
        this.saveAddresses()
      }else if(this.index==3){
        this.saveBankDetails()
      }
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
      this.addAgent.value['bdistrict']=value.name
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
      this.addAgent.value['prdistrict']=value.name
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
          this.addAgent.get('routingNo')?.setValue(this.routeNo)
          break;
        }
      }
    }
  
}
