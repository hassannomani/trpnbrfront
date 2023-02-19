import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { SigninService } from 'src/app/services/signin-service/signin.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    'username' : new FormControl('',[Validators.required, Validators.minLength(4)]),
    'password' : new FormControl('',[Validators.required, Validators.minLength(4)])
  })
  failed: boolean = false
  buttonLabel: string= "Log In"
  buttonColor: string = "primary"
  buttonType: string = "submit"
  errorMsg: string = ""
  constructor(
    private signinService: SigninService,
    private router: Router,
    private localstorageservc: LocalStorageService
    ){}

  login(){
    
  
    console.log(this.loginForm.value)
    if(this.loginForm.value.username!=""&&this.loginForm.value.password!=""){
      this.signinService
      .postVerifyUsers(this.loginForm.value)
      .subscribe({
        
        next: (data) => {
          if(data?.token!=""){
            this.localstorageservc.saveStorageItems(data)
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['add-agent']);
            }); 
            //this.router.navigate(['profile']);

          } 
          else{
            this.failed = true
          }
        },
        error: (e) => {
          console.log(e)
          console.log(e.error)
          if(e.status==401)
            this.errorMsg = "Username or password doesn't match"
          else
            this.errorMsg = e.error
          
            this.failed = true

        }
        
      });
    }
  }
    
    
  
}
