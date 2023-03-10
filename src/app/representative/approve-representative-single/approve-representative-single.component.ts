import { Component, OnInit,ChangeDetectorRef,ChangeDetectionStrategy,NgZone } from '@angular/core';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Route } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import {Title} from "@angular/platform-browser";

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
  buttonColor1: string = "primary"
  buttonType1: string = "button"
  representative: any ={}
  step: number = 0
  constructor(
    private representativeServ: RepresentativeService,
    private router: Router,
    private actroute: ActivatedRoute,
    private userService: UserService,
    private titleService:Title

  ){
    this.titleService.setTitle("Approve Representative");

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
}
