import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
@Component({
  selector: 'app-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.css']
})
export class ListAgentComponent implements OnInit{
  agentsArr: any = []
  loaded: boolean = false

  constructor(
    private userService: UserService
  ){}
  ngOnInit(): void {
  }

}
