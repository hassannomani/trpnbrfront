import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/services/agent-service/agent.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LedgerService } from 'src/app/services/ledger-service/ledger.service';

@Component({
  selector: 'app-agent-ledger',
  templateUrl: './agent-ledger.component.html',
  styleUrls: ['./agent-ledger.component.css']
})
export class AgentLedgerComponent implements OnInit{

  agentId: string = ""
  localStore: any ={}
  loaded: Boolean = true
  agentLedger: any =[]
  displayedColumn : any = []
  constructor(
    private localStorage: LocalStorageService,
    private agentService: AgentService ,
    private ledgerService: LedgerService ,
  ){}

  ngOnInit(): void {
    this.localStore = this.localStorage.getStorageItems()
    this.agentService.getAgentInfo(JSON.parse(this.localStore.username)).subscribe({
      next: (data) => {
        if(data.id)
          this.agentId = data.id
          this.getAgentLedger(this.agentId)
      },
      error: (e) => {
        this.loaded = false
      }
    })  
  }
  getAgentLedger(agentId:string){
    this.ledgerService.getAgentLedger(agentId).subscribe({
      next: (data) => {
        if(data.length)
          this.agentLedger = data
          this.loaded = true
          this.displayedColumn = ['taxpayerId','paidAmount','paymentMethod','assessmentYear','agentTin','representativeId']

      },
      error: (e) => {
        this.loaded = false
      }
    
    })
  }
}
