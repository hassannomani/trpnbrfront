import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { forkJoin } from 'rxjs';
import { AgentService } from 'src/app/services/agent-service/agent.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import { ActivatedRoute, Route } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
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
    constructor(
      private agentService: AgentService,  
      private commonService: CommonService, 
      private route: ActivatedRoute,
      private userService: UserService
    ){}
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
      forkJoin([this.commonService.getDistrict(),this.commonService.getDivision(),this.commonService.getThana()])
      .subscribe({
        next: (data) => {
          //console.log(data)
          this.district = data[0];
          this.division = data[1];
          this.thana = data[2];
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
      let presentobj={
        type: "PRESENT",
        division: this.addAgent.value['prdivision'],
        district: this.addAgent.value['prdistrict'],
        thana: this.addAgent.value['prthana'],
        address: this.addAgent.value['praddress'],
        addedBy: "ADMIN" 
      }
      let businessobj={
        type: "BUSINESS",
        division: this.addAgent.value['bdivision'],
        district: this.addAgent.value['bdistrict'],
        thana: this.addAgent.value['bthana'],
        address: this.addAgent.value['baddress'],
        addedBy: "ADMIN" 
      }
      let permanentobj={
        type: "PERMANENT",
        division: this.addAgent.value['pmdivision'],
        district: this.addAgent.value['pmdistrict'],
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
}
