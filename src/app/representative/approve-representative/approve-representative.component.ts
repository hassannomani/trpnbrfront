import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approve-representative',
  templateUrl: './approve-representative.component.html',
  styleUrls: ['./approve-representative.component.css']
})
export class ApproveRepresentativeComponent implements OnInit{
  representativesArr: any[] = []
  loaded: boolean = true;
  zeroData : boolean = false;
  displayedColumns: any = []
  buttonLabel: string = "See Details"
  buttonColor: string = "Basic"
  buttonType: string = "button"
  buttonLabel1: string = "Approve"
  buttonColor1: string = "primary"
  buttonType1: string = "button"
  constructor(
    private userService: UserService,
    private router: Router,

  ){}
  ngOnInit(): void {
    this
    .userService
    .getAllPendingUsers()
    .subscribe({
      next: (data) => {
        if(data.length){
          this.representativesArr = data
          this.loaded  = true
          this.displayedColumns = [ 'username','firstName','lastName','email','addedDate','action']
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

  approve(uuid : string, username: string){
    this.userService.approvePendingUser(uuid).subscribe({
      next: (data) => {
        if(data.length){
          
        } 
        else{
        }
      },
      error: (e) => {
       
      } 
    })
  }

  edit(uuid : string, username: string){
    console.log(uuid)
  }

}
