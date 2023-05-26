import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service';
import { AgentService } from 'src/app/services/agent-service/agent.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-agent-representative',
  templateUrl: './agent-representative.component.html',
  styleUrls: ['./agent-representative.component.css']
})
export class AgentRepresentativeComponent implements OnInit{
  representativeArr : any =[]
  loaded : Boolean = true
  empty: Boolean = false
  displayedColumns: any = []
  localStore: any ={}
  agentId: string =""
  constructor(
    private localstorage: LocalStorageService,
    private representativeServ: RepresentativeService,
    private agentServ: AgentService,
    private titleService:Title

  ){
    this.titleService.setTitle("List of Representative");

  }
  ngOnInit(): void {
    this.localStore = this.localstorage.getStorageItems();
    let uname = JSON.parse(this.localStore.username)
    this.agentServ.getAgentInfo(uname)
    .subscribe({
      next: (data) => {
        if(data.id){
          this.agentId = data.id
          this.getRepresentativeList(this.agentId)

        } else
            this.loaded = false
          
      },
      error: (e) => {
        this.loaded = false
      }
    })  
  }

  getRepresentativeList(id: string){
      console.log("reached here")
      this.representativeServ.getRepresentativeUnderAnAgent(id).subscribe({
        next: (data) => {
          if(data.length){
            this.representativeArr = data
            this.loaded  = true
            this.displayedColumns = [ 'tinNo','reName','reDob','reMobileNo','nid']
          } 
          else{
            this.empty = true
          }
        },
        error: (e) => {
          this.loaded = false;
        }  
      })
    
  }

}
