import { Component,OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LedgerService } from 'src/app/services/ledger-service/ledger.service';
import { AdminService } from 'src/app/services/admin-service/admin.service';
@Component({
  selector: 'app-admin-ledger',
  templateUrl: './admin-ledger.component.html',
  styleUrls: ['./admin-ledger.component.css']
})
export class AdminLedgerComponent implements OnInit{
  loaded: Boolean = true
  ledgers: any =[]
  displayedColumn : any = []
  constructor(
    private localStorage: LocalStorageService,
    private adminService: AdminService ,
    private ledgerService: LedgerService ,
  ){}
  ngOnInit(): void {
    this.adminService.getAdminLedger().subscribe({
      next: (data) => {
        if(data.length){
          console.log(data)
          this.ledgers = data
          this.displayedColumn = ['taxpayerId','paidAmount','paymentMethod','assessmentYear','agentTin','representativeId']
          this.loaded = true
        }
         
      },
      error: (e) => {
        this.loaded = false
      }
    })
  }
}
