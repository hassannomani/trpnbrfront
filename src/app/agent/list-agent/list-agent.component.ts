import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/services/agent-service/agent.service';
import {Title} from "@angular/platform-browser";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.css']
})
export class ListAgentComponent implements OnInit{
  agentsArr: any = []
  loaded: boolean = false
  displayedColumns: any = []
  buttonLabel: string = "Edit"
  buttonColor: string = "primaryalt"
  buttonType: string = "Button"

  constructor(
    private agentService: AgentService,
    private titleService:Title,
    private router: Router

  ){
    this.titleService.setTitle("List of Agents");

  }
  ngOnInit(): void {
    this.agentService.getAll()
    .subscribe({
      next: (data) => {
        //console.log(data)
        this.agentsArr = data
        this.loaded = true
        this.displayedColumns = [ 'name','username','mobile_no','registration_no','contact_email', 'action']

      },
      error: (e) => {
        this.loaded = false;
        console.log("Error retrieving")
      }
    });
  }

  edit(username: string){
    console.log(username)
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['edit-agent'],{ queryParams: {username: username}});
    }); 
  }

}
