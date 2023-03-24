import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AgentService } from 'src/app/services/agent-service/agent.service';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service'; 
import { UserService } from 'src/app/services/user-service/user.service';
import {Title} from "@angular/platform-browser";
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { LedgerService } from 'src/app/services/ledger-service/ledger.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-report-admin',
  templateUrl: './report-admin.component.html',
  styleUrls: ['./report-admin.component.css']
})
export class ReportAdminComponent implements OnInit{
  buttonLabel: string= "Submit"
  buttonLabel1: string= "Download as PDF"
  buttonColor: string = "primary"
  buttonType: string = "button"
  dataSecondary: any =[]
  showThirdA: boolean = false
  showThirdR: boolean = false
  showThirdD1: boolean = false
  showThirdD2: boolean = false
  firstOption: string = ""
  secondOption: string = ""
  loaded: boolean = false
  empty: boolean = true
  dataArr : any =[]
  displayedColumns: any =[]
  logoBase : string = ""
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
    private adminService: AdminService,
   
  ){
    this.titleService.setTitle("Report");
  }

  ngOnInit(): void {
   
  }

  reportType(value:any){

    console.log(value)
    this.firstOption = value
    if(value==1)
      this.dataSecondary = [{"id":1,"value":"All Agents"},{"id":2, "value": "All Representative of an Agent"}, {"id":1,"value":"Search By Creation Date"}]
    else if(value==2)
      this.dataSecondary = [{"id":1,"value":"All Representatives"},{"id":2,"value":"Search By Creation Date"}]
    else if (value==3)
      this.dataSecondary = [
        {"id":"1","value":"All"},
        {"id":"2", "value": "Agent"},
        {"id":"3", "value":"Representative"},
        {"id":"4","value":"Date Range"},
        {"id":"5","value":"Agent Ledger with Date Range"},
        {"id":"6","value":"Representative Ledger with Date Range"}
      ]

  }
  reportSubType(value: any){
    this.secondOption  = value
    if((value=="2" && this.firstOption=="1")||(this.firstOption=="3"&&value=="2")){
      this.showThirdA = true
      this.showThirdR = false
      this.showThirdD1=false
      this.showThirdD2=false
    }else if((value=="3"&&this.firstOption=="1")||(value=="2"&&this.firstOption=="2")){
      this.showThirdA = false
      this.showThirdR = false
      this.showThirdD1=true
      this.showThirdD2=true
    }
    else if(value=="3" && this.firstOption=="3"){
      this.showThirdR =  true
      this.showThirdA = false
      this.showThirdD1=false
      this.showThirdD2=false
    }else if((value=="4"||value=="5"||value=="6")&&this.firstOption=="3"){
      
      this.showThirdD1=true
      this.showThirdD2=true
      if(value=="4"){
        this.showThirdA=false
        this.showThirdR = false
      }else if(value=="5"){
        this.showThirdA=true
        this.showThirdR = false
      }else{
        this.showThirdA=false
        this.showThirdR = true
      }
     
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
    else if(this.firstOption=="2" && this.secondOption=="1")
      this.getAllRepresentatives()

    else if(this.firstOption=="2" && this.secondOption=="2"){
      let thirdVal= this.reportSubmission.value["startDate"]
      let fourthVal= this.reportSubmission.value["endDate"]
      this.getAllRepresentativesWithDate(thirdVal,fourthVal)

    }

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
    
    else if(this.firstOption=="3"&&(this.secondOption=="4"||this.secondOption=="5"||this.secondOption=="6")){
      let thirdVal= this.reportSubmission.value["startDate"]
      let fourthVal= this.reportSubmission.value["endDate"]
      if(this.secondOption=="4")
        this.getAllLedgerRange(thirdVal,fourthVal)
      else if(this.secondOption=="5"){
        let fifthVal = this.reportSubmission.value["agusername"]
        this.getagentLedgerRange(thirdVal,fourthVal,fifthVal)
      }
      else if(this.secondOption=="6"){
        let fifthVal = this.reportSubmission.value["repusername"]
        this.getrepresentativeLedgerRange(thirdVal,fourthVal,fifthVal)
      }
       
    }
  }

  getAllAgents(){
    this.agentService.getAll()
    .subscribe({
      next: (data) => {
        let col = [ 'name','tin','phone','registration_no','contact_email']
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
    this.representativeService.getAllRepresentatives().subscribe({
      next: (data) => {
        let col = [ 'tinNo','reName','reDob','reMobileNo','nid']     
         this.positiveResponse(data, col)
      },
      error: (e) => {
        this.loaded = false
      }
    })
  }

  getAllLedgers(){
    this.adminService.getAdminLedger().subscribe({
      next: (data) => {
        let col = ['taxpayerId','created_at','paidAmount','paymentMethod','assessmentYear','agentTin','representativeId']     
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
    this.ledgerService.getAllRangeLedger(startDate,endDate).subscribe({
      next: (data) => {
        let col = ['taxpayerId','created_at','paidAmount','paymentMethod','assessmentYear','agentTin','representativeId']
        this.positiveResponse(data, col)
      },
      error: (e) => {
        this.loaded = false;
      }  
    })
  }

  getagentLedgerRange(startDate: any, endDate: any, agentId: any){
    this.ledgerService.getAgentRangeLedger(startDate,endDate,agentId).subscribe({
      next: (data) => {
        let col = ['taxpayerId','created_at','paidAmount','paymentMethod','assessmentYear','agentTin','representativeId']
        this.positiveResponse(data, col) 
      },
      error: (e) => {
        this.loaded = false
      }
    })
  }

  getrepresentativeLedgerRange(startDate: any, endDate: any, representativeId: any){
    this.ledgerService.getRepresentativeRangeLedger(startDate,endDate,representativeId).subscribe({
      next: (data) => {
        let col = ['taxpayerId','created_at','paidAmount','paymentMethod','assessmentYear','agentTin','representativeId']
        this.positiveResponse(data, col) 
      },
      error: (e) => {
        this.loaded = false
      }
    })
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
        let col = ['taxpayerId','created_at','paidAmount','paymentMethod','assessmentYear','agentTin','representativeId']
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
        let col = ['taxpayerId','created_at','paidAmount','paymentMethod','assessmentYear','agentTin','representativeId']
        this.positiveResponse(data,col)
      },
      error: (e) => {
        this.loaded = false
      }
    
    })
  }

  getAllRepresentativesWithDate(startDate: any, endDate: any){
    // this.representativeService.getAllRepresentativesInRange(startDate,endDate).subscribe({

    // })
  }

  open(){
    var logobase = ""
    this.toDataURL('../../assets/img/bdlogo.png', function(dataUrl:any) {
     logobase  = dataUrl
    })
    
    let DATA: any = document.getElementById('dataTable');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;


      PDF.addImage(logobase, 'PNG', 100, 15, 10, 10);
      PDF.setFontSize(12);
      PDF.text("National Board of Revenue", 82, 35);
      PDF.setFontSize(8);

      PDF.text("Tax Return Preparer", 90, 43);
      PDF.addImage(FILEURI, 'PNG', 0, 55, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
    
  }

  toDataURL(url: any, callback:any) {
  
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  
  

  positiveResponse(data : any, arr:any){
    if(data.length){
      this.dataArr = data
      this.loaded  = true
      this.displayedColumns = arr
    } 
    else{
      this.dataArr = []
      this.empty = true
    }
  }

}
