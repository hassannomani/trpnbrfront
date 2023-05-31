import { Component, OnInit,ChangeDetectorRef,ChangeDetectionStrategy,NgZone } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-approve-representative',
  templateUrl: './approve-representative.component.html',
  styleUrls: ['./approve-representative.component.css'],
  changeDetection: ChangeDetectionStrategy.Default

})
export class ApproveRepresentativeComponent implements OnInit{
  representativesArr: any[] = []
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
  buttonLabel2: string = "Reject"
  buttonType2: string = "button"
  buttonColor2: string = "warn"
  helperArr: any =[]
  constructor(
    private userService: UserService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private zone: NgZone,
    private titleService:Title
  ){
    this.titleService.setTitle("Approve TRP");

  }
  ngOnInit(): void {
    this
    .userService
    .getAllPendingUsers()
    .subscribe({
      next: (data) => {
        if(data.length){
          this.representativesArr = data
          this.helperArr = data
          this.loaded  = true
          this.displayedColumns = [ 'username','firstName','lastName','addedBy','addedDate','action']
        } 
        else{
          this.zeroData = true
        }
      },
      error: (e) => {
        this.loaded = false;
      }  
    })
  }

  approve(uuid : string, index: string){   
 
    // let data = this.helperArr.splice(parseInt(index),1)
    // let dtemp  = data
    // data = this.representativesArr
    // //this.representativesArr = this.helperArr
    // this.zone.run(()=>{
    //       // this.helperArr = this.representativesArr
    //       // console.log(this.helperArr)
          
    //       this.representativesArr=this.helperArr
    //       //this.changeDetector.detectChanges();
    // }) 

    this.userService.approvePendingUser(uuid).subscribe({
      next: (data) => {
        if(data.uuid){
          alert("User Approved!")
          this.ngOnInit()          
        } 
      },
      error: (e) => {
        this.approveFailed = true;
        console.log(e)
      } 
    })
  }

  details(tin : string, index: string){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['approve-representative-details'],{ queryParams: {username:tin}});
    });
  }

  reject(username : string, index: string){   
 
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['user-action'],{ queryParams: {username:username,deny:1}});
    });
    // this.userService.rejectPendingUser(uuid).subscribe({
    //   next: (data) => {
    //     if(data.uuid){
    //       alert("User Rejected!")
    //       this.ngOnInit()          
    //     } 
    //   },
    //   error: (e) => {
    //     this.approveFailed = true;
    //     console.log(e)
    //   } 
    // })
  }

}
