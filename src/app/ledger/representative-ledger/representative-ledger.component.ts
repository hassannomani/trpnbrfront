import { Component,OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LedgerService } from 'src/app/services/ledger-service/ledger.service';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service';
@Component({
  selector: 'app-representative-ledger',
  templateUrl: './representative-ledger.component.html',
  styleUrls: ['./representative-ledger.component.css']
})
export class RepresentativeLedgerComponent implements OnInit{
  loaded: Boolean = true
  representativeLedger: any =[]
  displayedColumn : any = []
  localStore: any ={}
  representativeId: string =""
  constructor(
    private localStorage: LocalStorageService,
    private ledgerService: LedgerService,
    private representativeServ: RepresentativeService
  ){}

  ngOnInit(): void {
    this.localStore = this.localStorage.getStorageItems()
    this.representativeServ.getARepresentative(JSON.parse(this.localStore.username)).subscribe({
      next: (data) => {
        if(data.userid){
          this.representativeId = data.userid
          this.getRepresentativeLedger(this.representativeId)
        } else
            this.loaded = false
          
      },
      error: (e) => {
        this.loaded = false
      }
    })  
  }

  getRepresentativeLedger(representativeId:string){
    this.ledgerService.getRepresentativeLedger(representativeId).subscribe({
      next: (data) => {
        if(data.length)
          this.representativeLedger = data
          this.loaded = true
          this.displayedColumn = ['taxpayerId','paidAmount','paymentMethod','assessmentYear','agentTin','representativeId']

      },
      error: (e) => {
        this.loaded = false
      }
    
    })
  }
}
