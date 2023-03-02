import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service';
@Component({
  selector: 'app-agent-representative',
  templateUrl: './agent-representative.component.html',
  styleUrls: ['./agent-representative.component.css']
})
export class AgentRepresentativeComponent implements OnInit{
  representativeArr : any =[]
  loaded : Boolean = false
  empty: Boolean = false
  displayedColumns: any = []
  constructor(
    private localstorage: LocalStorageService,
    private representativeServ: RepresentativeService,
  ){

  }
  ngOnInit(): void {
    let items = this.localstorage.getStorageItems();
    let uuid = items?.id;
    if(uuid!=null){
      this.representativeServ.getRepresentativeUnderAnAgent(uuid)
      .subscribe({
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

}
