import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import {Title} from "@angular/platform-browser";
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { FormControl, FormGroup, NgForm, Validators, AbstractControl } from '@angular/forms';
import { CommonService } from 'src/app/services/common-service/common.service';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.css']
})
export class UserActionComponent implements OnInit{
  
  sender: any = ""
  receiver: any = ""
  sent: boolean = false
  buttonLabel: string = "Send"
  buttonColor: string = "primary"
  buttonType: string = "button"
  buttonLabel2: string = "Upload"
  buttonColor2: string = "primary"
  buttonType2: string = "button"
  type_of_message: any = []
  uploaded: boolean = false
  uploadFailed: boolean = false
  failed: boolean = false
  file !: File
  addAction = new FormGroup({
    'sender' : new FormControl('',[Validators.required]),
    'receiver' : new FormControl('',[Validators.required]),
    'message' : new FormControl('',[Validators.required]),
    'actionType' : new FormControl('',[Validators.required]),
    'actionFrom' : new FormControl('',[Validators.required]),
    'actionTo' : new FormControl('',[Validators.required]),
    'attachment': new FormControl('',[Validators.required]),
    
  })
  constructor(
    private userService: UserService,
    private router: Router,
    private titleService:Title,
    private route: ActivatedRoute,
    private commonService: CommonService
  ){
    this.titleService.setTitle("User List");
  }
  ngOnInit(): void{
    this
    .route
    .queryParams
    .subscribe(paramsg=>{
      let uname = paramsg['username']
      if(uname!=null){
        this.type_of_message = ['WARNING','DENY','SUSPEND','BLOCK']
        console.log(uname)
      }
    })
  }

  selectFile(event: any){
    this.file = event.target.files.item(0);
  }

  uploadFile() {
    this.commonService.uploadFile(this.file).subscribe({
      next: (data) => {
        console.log(data.fileUri)
        if(data.fileUri){
          this.addAction.get('attachment')?.setValue(data.fileUri);
          this.uploaded = true
        }
        //this.fileUris.push(this.fileDetails.fileUri);
        //alert("File Uploaded Successfully")
      },
      error: (e) => {
        console.log(e);
        this.uploadFailed= true
      }
    });
  }

  actionSubmit(){
    
  }
}
