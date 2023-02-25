import { Component, OnInit,ChangeDetectorRef,ChangeDetectionStrategy,NgZone } from '@angular/core';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Route } from '@angular/router';

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

  ){}
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
}
