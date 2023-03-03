import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/services/agent-service/agent.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-agent-ledger',
  templateUrl: './agent-ledger.component.html',
  styleUrls: ['./agent-ledger.component.css']
})
export class AgentLedgerComponent implements OnInit{

  agentId: string = ""
  localStore: any ={}
  loaded: Boolean = true

  constructor(
    private localStorage: LocalStorageService,
    private agentService: AgentService ,
  ){}

  ngOnInit(): void {
    this.localStore = this.localStorage.getStorageItems()
    this.agentService.getAgentInfo(JSON.parse(this.localStore.username)).subscribe({
      next: (data) => {
       this.agentId = data.id
      },
      error: (e) => {
        this.loaded = false
      }
    })  
  }
}
