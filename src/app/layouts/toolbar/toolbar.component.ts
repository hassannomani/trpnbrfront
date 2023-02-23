import { Component,OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { SigninService } from 'src/app/services/signin-service/signin.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{
  
  isLoggedIn: boolean = false;
  isAdmin: boolean = false
  isViewer: boolean = false
  isAgent: boolean = false;
  isRepresentative: boolean = false;
  constructor(
    
    private localStorage: LocalStorageService,
    private signInService: SigninService
  ){}
  ngOnInit(): void {
    this.signInService.loginStatusChange().subscribe(loggedIn => {
      let local = this.localStorage.getStorageItems();
      console.log(local)
      if(local.token==""||local.token==null)
        this.isLoggedIn = false;
      else{
        this.isLoggedIn = true;
        let role = local.role!=null?JSON.parse(local.role):null;
        if(role=="ROLE_ADMIN")
          this.isAdmin = true
        else if(role=="ROLE_AGENT")
          this.isAgent = true
        else if(role=="ROLE_REPRESENTATIVE")
          this.isRepresentative = true
        else if(role=="ROLE_VIEWER")
          this.isViewer = true
      }
      
    })
   
  }
  

}
