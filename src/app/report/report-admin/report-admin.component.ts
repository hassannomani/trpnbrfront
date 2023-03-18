import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AgentService } from 'src/app/services/agent-service/agent.service';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service'; 
import { UserService } from 'src/app/services/user-service/user.service';
import {Title} from "@angular/platform-browser";
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { LedgerService } from 'src/app/services/ledger-service/ledger.service';
@Component({
  selector: 'app-report-admin',
  templateUrl: './report-admin.component.html',
  styleUrls: ['./report-admin.component.css']
})
export class ReportAdminComponent implements OnInit{
  buttonLabel: string= "Submit"
  buttonColor: string = "primary"
  buttonType: string = "button"
  dataSecondary: any =[]
  showThirdA: boolean = false
  showThirdR: boolean = false
  showThirdD1: boolean = false
  showThirdD2: boolean = false
  firstOption: string = ""
  secondOption: string = ""
  loaded: boolean = true
  empty: boolean = true
  dataArr : any =[]
  displayedColumns: any =[]
  reportSubmission = new FormGroup({
    'type' : new FormControl('',[Validators.required]),
    'subtype' : new FormControl('',[Validators.required]),
    'agusername' : new FormControl('',[Validators.required]),
    'repusername' : new FormControl('',[Validators.required]),
    'startDate' : new FormControl('',[Validators.required]),
    'endDate' : new FormControl('',[Validators.required])
  })

  constructor(
    private agentService: AgentService,  
    private representativeService: RepresentativeService,
    private ledgerService: LedgerService,
    private titleService:Title,
    private adminService: AdminService
  ){
    this.titleService.setTitle("Report");
  }

  ngOnInit(): void {
    
  }

  reportType(value:any){

    console.log(value)
    this.firstOption = value
    if(value==1)
      this.dataSecondary = [{"id":1,"value":"All Agents"},{"id":2, "value": "All Representative of an Agent"}]
    else if(value==2)
      this.dataSecondary = [{"id":1,"value":"All Representatives"}]
    else if (value==3)
      this.dataSecondary = [{"id":1,"value":"All"},{"id":2, "value": "Agent"},{"id":"3", "value":"Representative"},{"id":"4","value":"Date Range"}]

  }
  reportSubType(value: any){
    this.secondOption  = value
    if((value=="2" && this.firstOption=="1")||(this.firstOption=="3"&&value=="2")){
      this.showThirdA = true
      this.showThirdR = false
      this.showThirdD1=false
      this.showThirdD2=false
    }
    else if(value=="3" && this.firstOption=="3"){
      this.showThirdR =  true
      this.showThirdA = false
      this.showThirdD1=false
      this.showThirdD2=false
    }else if(value=="4"&&this.firstOption=="3"){
      this.showThirdD1=true
      this.showThirdD2=true
      this.showThirdA=false
      this.showThirdR = false
    }
    else{
      this.showThirdA = false
      this.showThirdR = false
      this.showThirdD1=false
      this.showThirdD2=false
    }
  }

  
  formSubmit(){
   
    if(this.firstOption=="1"&&this.secondOption=="1")
      this.getAllAgents()

    else if(this.firstOption=="1"&&this.secondOption=="2"){

      let thirdVal = this.reportSubmission.value["agusername"]
      this.getAllRepresentativeOfAnAgent(thirdVal)

    }
    else if(this.firstOption=="2")
      this.getAllRepresentatives()

    else if(this.firstOption=="3"&&this.secondOption=="1")
      this.getAllLedgers()

    else if(this.firstOption=="3"&&this.secondOption=="2"){
      let thirVal = this.reportSubmission.value["agusername"]
      this.getAllLedgerAgent(thirVal)
    }
    
    else if (this.firstOption=="3"&&this.secondOption=="3"){
      let thirVal = this.reportSubmission.value["repusername"]
      this.getAllLedgerRepresentative(thirVal)
    } 
    
    else if(this.firstOption=="3"&&this.secondOption=="4"){
      let thirdVal= this.reportSubmission.value["startDate"]
      let fourthVal= this.reportSubmission.value["endDate"]
      this.getAllLedgerRange(thirdVal,fourthVal)
    }
  }

  getAllAgents(){
    this.agentService.getAll()
    .subscribe({
      next: (data) => {
        let col = [ 'name','username','mobile_no','registration_no','contact_email', 'action']
        this.positiveResponse(data, col)
      },
      error: (e) => {
        this.loaded = false;
        console.log("Error retrieving")
      }
    });
  }

  getAllRepresentativeOfAnAgent(val: any){
    this.agentService.getAgentInfo(val)
    .subscribe({
      next: (data) => {
        if(data.id){
          let agentId = data.id
          this.getAllRepresentativeOfAnAgentSecStep(agentId)

        } else
            this.loaded = false
          
      },
      error: (e) => {
        this.loaded = false
      }
    })  
  }

  getAllRepresentatives(){

  }

  getAllLedgers(){
    this.adminService.getAdminLedger().subscribe({
      next: (data) => {
        let col = ['taxpayerId','paidAmount','paymentMethod','assessmentYear','agentTin','representativeId']     
         this.positiveResponse(data, col)
      },
      error: (e) => {
        this.loaded = false
      }
    })
  }

  getAllLedgerAgent(agent: any){
    this.agentService.getAgentInfo(agent)
    .subscribe({
      next: (data) => {
        if(data.id){
          let agentId = data.id
          this.getAllLedgerAgentSecStep(agentId)

        } else
            this.loaded = false
          
      },
      error: (e) => {
        this.loaded = false
      }
    })  
  }

  getAllLedgerRepresentative(representative: any){
    this.representativeService.getARepresentative(representative).subscribe({
      next: (data) => {
        if(data.userid){
          this.getAllLedgerRepresentativeSecStep(data.userid)
        } else
            this.loaded = false
      },
      error: (e) => {
        this.loaded = false
      }
    })  
  }

  getAllLedgerRange(startDate: any, endDate: any){

  }

  getAllRepresentativeOfAnAgentSecStep(val: any){
    this.representativeService.getRepresentativeUnderAnAgent(val).subscribe({
      next: (data) => {
        let col = [ 'tinNo','reName','reDob','reMobileNo','nid']
        this.positiveResponse(data, col)
      },
      error: (e) => {
        this.loaded = false;
      }  
    })
  }
  getAllLedgerAgentSecStep(agentId: any){
    this.ledgerService.getAgentLedger(agentId).subscribe({
      next: (data) => {
        let col = ['taxpayerId','paidAmount','paymentMethod','assessmentYear','agentTin','representativeId']
        this.positiveResponse(data, col)
      },
      error: (e) => {
        this.loaded = false
      }
    })
  }
  getAllLedgerRepresentativeSecStep(repId:any){
    this.ledgerService.getRepresentativeLedger(repId).subscribe({
      next: (data) => {
        let col = ['taxpayerId','paidAmount','paymentMethod','assessmentYear','agentTin','representativeId']
        this.positiveResponse(data,col)
      },
      error: (e) => {
        this.loaded = false
      }
    
    })
  }

  positiveResponse(data : any, arr:any){
    if(data.length){
      this.dataArr = data
      this.loaded  = true
      this.displayedColumns = arr
    } 
    else{
      this.empty = true
    }
  }

}
