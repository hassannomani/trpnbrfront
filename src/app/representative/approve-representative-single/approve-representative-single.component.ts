import { Component, OnInit,ChangeDetectorRef,ChangeDetectionStrategy,NgZone } from '@angular/core';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Route } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import {Title} from "@angular/platform-browser";
import { DomSanitizer } from '@angular/platform-browser';
import { AgentService } from 'src/app/services/agent-service/agent.service';

@Component({
  selector: 'app-approve-representative-single',
  templateUrl: './approve-representative-single.component.html',
  styleUrls: ['./approve-representative-single.component.css']
})
export class ApproveRepresentativeSingleComponent implements OnInit {
  loaded: boolean = true;
  zeroData : boolean = false;
  approveFailed : boolean = false;
  displayedColumns: any = []
  buttonLabel: string = "See Details"
  buttonColor: string = "Basic"
  buttonType: string = "button"
  buttonLabel1: string = "Approve"
  buttonLabel2: string = "Certificate"
  buttonColor1: string = "primary"
  buttonType1: string = "button"
  representative: any ={}
  agent: any ={}
  step: number = 0
  image: any 
  constructor(
    private representativeServ: RepresentativeService,
    private router: Router,
    private actroute: ActivatedRoute,
    private userService: UserService,
    private titleService:Title,
    private commonService: CommonService,
    private sanitizer: DomSanitizer,
    private agentService: AgentService
  ){
    this.titleService.setTitle("Approve TRP");

  }
  ngOnInit(): void {
    this
      .actroute
      .queryParams
      .subscribe(paramsg=>{
        let username = paramsg['username']
        if(username!=null){
          this.representativeServ.getARepresentative(username).subscribe({
            next: (data) => {
              if(data.userid){
                this.representative = data
                this.loaded = true
                this.loadPhoto(data.rePhoto)
                this.loadAgent(data.agentId)
              }
            },
            error: (e) => {
                this.loaded = false
                console.log("Error retrieving")
            }
          })
        }

      })

  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  approve(username : string,){   

    this.userService.approvePendingUserByTin(username).subscribe({
      next: (data) => {
        if(data.uuid){
          alert("User Approved!")
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['approve-representatives']);
          });        
        } 
      },
      error: (e) => {
        alert("Approval Failed!")
        console.log(e)
      } 
    })
  }

  openPdf(){
    //window.open(this.representative.filePath, '_blank');
    let temp = this.representative.filePath.split("\\")
    if(temp.length){
      console.log(temp[temp.length-1])
      this.commonService.loadFile(temp[temp.length-1]).subscribe({
        next: (data) => {
         // console.log(data)
          const fileURL = URL.createObjectURL(data);
          window.open(fileURL, '_blank');
        },
        error: (e) => {
          alert("File loading Failed!")
          console.log(e)
        } 
      })
    }else alert("file not found")
   

  }

  reject(tin : string){   
    
    this.userService.getAUser(tin).subscribe({
      next: (data) => {
        if(data!=null){
          if(data.uuid)
            this.rejectByTinMainBody(data.uuid)
        } else{
          alert("User Not found")
        } 
      },
      error: (e) => {
        this.approveFailed = true;
        console.log(e)
      } 
    })
  }

  rejectByTinMainBody(id: string){
    this.userService.rejectPendingUser(id).subscribe({
      next: (data) => {
        if(data.uuid){
          alert("User Rejected!")
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['approve-representatives']);
          });         
        } 
      },
      error: (e) => {
        this.approveFailed = true;
        console.log(e)
      } 
    })
  }

  loadPhoto(url: string){
    let temp = url.split("\\")
    console.log(temp)
    if(temp.length){
      console.log(temp[temp.length-1])
      this.commonService.loadPhoto(temp[temp.length-1]).subscribe({
        next: (data) => {
         // console.log(data)
          //const fileURL = URL.createObjectURL(data);
          let temp = data
          let objectURL = URL.createObjectURL(temp)

          this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        
        },
        error: (e) => {
          alert("File loading Failed!")
          console.log(e)
        } 
      })
    }else alert("file not found")
  }

  loadAgent(tin: string){
    this.agentService.getAgentInfo(tin).subscribe({
      next: (data) => {
        this.agent = data        
        console.log(this.agent)
       },
       error: (e) => {
         alert("File loading Failed!")
         console.log(e)
       }       
    })
  }

}
