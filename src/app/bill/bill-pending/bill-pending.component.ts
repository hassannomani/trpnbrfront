import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { CommissionService } from 'src/app/services/commission-service/commission.service';
import { LedgerService } from 'src/app/services/ledger-service/ledger.service';
import { BillingService } from 'src/app/services/billing-service/billing.service';

@Component({
  selector: 'app-bill-pending',
  templateUrl: './bill-pending.component.html',
  styleUrls: ['./bill-pending.component.css']
})
export class BillPendingComponent implements OnInit{

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: any = []
  message : string = ""
  buttonLabel: string = "Check"
  buttonLabel2: string = "Submit"
  buttonColor: string = "primary"
  buttonType: string = "button"
  dataReceived: boolean = false
  dataList: any = []
  tobeApproved: any = []
  validated: boolean = false
  checkedBills: any = []
  constructor(
    private router: Router,
    private titleService:Title,
    private localStore: LocalStorageService,
    private commissionServ: CommissionService,
    private _snackBar: MatSnackBar,
    private ledgerServ: LedgerService,
    private billingServ: BillingService
  ){
    this.titleService.setTitle("Approve Bill");
  }
  ngOnInit(): void {
    this.loadPendingBills()
  }

  loadPendingBills(){
    this.billingServ.adminpendingBills().subscribe({
      next: (data) => {
        if(data.length){
          this.dataReceived = true
          this.displayedColumns = ['Serial', 'taxpayer_id','taxpayer_name','payee','name','payee_type','creation_date','amount','action']
          this.dataList = data
        } 
        else{
          this.message = "No Data found"
          this.openSnackBar()
        }
      },
      error: (e) => {
        console.log(e)
        this.message = "Error Retrieving Data. Please try again"
        this.openSnackBar()
      } 
    })
  }

  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }
  toggle(event:any){
    let val 
    val =  event.source.value
    let obj ={
      id: val.creationNo,
      ledger: val.ledger_id,
      role: val.payee_type
    }
    let flag =1
    for(let i=0;i<this.tobeApproved.length;i++)
    {
      if(this.tobeApproved[i].id==obj.id){
        this.tobeApproved.splice(i,1)
        flag=0
        break
      }
    }
    if(flag==1){
      this.tobeApproved.push(obj)
    }
  }

  checkValidation(){
    this.message = "Bill is being checked. Please wait"
    this.openSnackBar()
    
    this.billingServ.validatePendingBills(this.tobeApproved).subscribe({
      next: (data) => {
       this.checkedBills=data
       this.validated=true
      },
      error: (e) => {
        console.log(e)
        this.message = "Error Retrieving Data. Please try again"
        this.openSnackBar()
      } 
    })

  }

  submit(){
    this.checkAll().then(res=>{
      if(this.tobeApproved.length){
        this.billingServ.approvePendingBills(this.tobeApproved).subscribe({
          next: (data) => {
            console.log(data)
          },
          error: (e) => {
            console.log(e)
            this.message = "Error Retrieving Data. Please try again"
            this.openSnackBar()
          } 
        })
      }
    })

  }

  checkAll(){
    return new Promise((resolve, reject) => {
      let redFlags = []
      for(let i=0;i<this.checkedBills.length;i++){
        if(this.checkedBills[i][1]!="0")
          redFlags.push(this.checkedBills[i][0])
      }
      
      for(let i=0;i<redFlags.length;i++){
        for(let j=0;j<this.tobeApproved.length;j++){
          if(redFlags[i]==this.tobeApproved[j].id){
            console.log("found")
            this.tobeApproved.splice(j,1)
            this.message = "Duplicate entry found and removed"
            this.openSnackBar()
          }
        }
      }
      resolve(this.tobeApproved)
    })
  }


}
